import type { VersionBumpOptions, VersionBumpProgress, VersionBumpResults } from './types';
import process from 'node:process';
import pc from 'ansis';
import prompts from 'prompts';
import { exec } from '@elinzy/core';
import { onCancel, onPromptState } from '@/utils/functions';
import { getCurrentVersion } from './get-current-version';
import { getNewVersion } from './get-new-version';
import { gitCommit, gitPush, gitTag } from './git';
import { Operation } from './operation';
import { printRecentCommits } from './print-commits';
import { runNpmScript } from './run-npm-script';
import { buildTokens, renderTemplate } from './tokens';
import { NpmScript, ProgressEvent } from './types';
import { updateFiles } from './update-files';
import { getCommits } from 'tiny-conventional-commits-parser';

const symbols = {
  success: pc.green('✔'),
  info: pc.blue('ℹ'),
};

const progress = ({
  event,
  script,
  updatedFiles,
  skippedFiles,
  newVersion,
}: VersionBumpProgress) => {
  switch (event) {
    case ProgressEvent.FileUpdated:
      console.log(
        symbols.success,
        `Updated ${updatedFiles[updatedFiles.length - 1]} to ${newVersion}`,
      );
      break;

    case ProgressEvent.FileSkipped:
      console.log(
        symbols.info,
        `${skippedFiles[skippedFiles.length - 1]} did not need to be updated`,
      );
      break;

    case ProgressEvent.GitCommit:
      console.log(symbols.success, 'Git commit');
      break;

    case ProgressEvent.GitTag:
      console.log(symbols.success, 'Git tag');
      break;

    case ProgressEvent.GitPush:
      console.log(symbols.success, 'Git push');
      break;

    case ProgressEvent.NpmScript:
      console.log(symbols.success, `Npm run ${script}`);
      break;
  }
};

/**
 * Gets the conventional commits since the last tag (or the whole history when
 * the repo has no tags yet). Probes the last tag ourselves so a missing tag
 * doesn't leak `git describe`'s stderr into the console.
 */
async function getCommitsSinceLastTag() {
  const lastTag = (await exec('git', ['describe', '--tags', '--abbrev=0'], {
    throwOnError: false,
    abbrev: true,
  })) as string | undefined;

  return getCommits(lastTag?.trim());
}

/**
 * Bumps the version number in one or more files, prompting the user if necessary.
 * Optionally also commits, tags, and pushes to git.
 */
async function versionBump(options: VersionBumpOptions): Promise<VersionBumpResults> {
  const operation = await Operation.start(options);

  const commits = await getCommitsSinceLastTag();
  if (operation.options.printCommits) {
    printRecentCommits(commits);
  }

  // Get the old and new version numbers
  await getCurrentVersion(operation);
  await getNewVersion(operation, commits);

  if (operation.options.confirm) {
    printSummary(operation);

    const { yes } = await prompts(
      {
        name: 'yes',
        type: 'confirm',
        message: 'Bump?',
        initial: true,
        onState: onPromptState,
      },
      { onCancel },
    );

    if (!yes) process.exit(1);
  }

  // Run npm preversion script, if any
  await runNpmScript(NpmScript.PreVersion, operation);

  // Update the version number in all files
  await updateFiles(operation);

  if (operation.options.install) {
    await installDependencies(operation);
  }

  if (operation.options.execute) {
    await executeScript(operation);
  }

  // Run npm version script, if any
  await runNpmScript(NpmScript.Version, operation);

  // Git commit and tag, if enabled
  await gitCommit(operation);
  await gitTag(operation);

  // Run npm postversion script, if any
  await runNpmScript(NpmScript.PostVersion, operation);

  // Push the git commit and tag, if enabled
  await gitPush(operation);

  return operation.results;
}

/**
 * Runs the detected package manager's install command.
 */
async function installDependencies(operation: Operation): Promise<void> {
  const { detect } = await import('package-manager-detector/detect');
  const pm = await detect();
  if (!pm?.name) {
    throw new Error('Could not detect package manager, failed to run install');
  }

  const { COMMANDS, constructCommand } = await import('package-manager-detector/commands');
  const command = constructCommand(COMMANDS[pm.name].install, []);
  if (!command) {
    throw new Error('Could not find install command for package manager');
  }

  console.log(
    symbols.info,
    'Installing dependencies with',
    `${command.command} ${command.args.join(' ')}`,
  );
  await exec(command.command, command.args, {
    stdio: 'inherit',
    cwd: operation.options.cwd,
  });
  console.log(symbols.success, 'Dependencies installed');
}

/**
 * Runs the `execute` script (after bumping, before committing).
 */
async function executeScript(operation: Operation): Promise<void> {
  const [command, ...args] = tokenize(operation.options.execute!);
  console.log(symbols.info, 'Executing script', command, ...args);
  await exec(command, args, {
    stdio: 'inherit',
    cwd: operation.options.cwd,
  });
  console.log(symbols.success, 'Script finished');
}

/**
 * Splits a command string into tokens, honoring single- and double-quoted segments.
 */
function tokenize(input: string): string[] {
  const tokens = input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];
  return tokens.map((token) => token.replace(/^(['"])(.*)\1$/, '$2'));
}

function printSummary(operation: Operation) {
  const tokens = buildTokens(operation);
  console.log();
  console.log(`   files ${operation.options.files.map((i) => pc.bold(i)).join('\n         ')}`);
  if (operation.options.commit)
    console.log(`  commit ${pc.bold(renderTemplate(operation.options.commit.message, tokens))}`);
  if (operation.options.tag)
    console.log(`     tag ${pc.bold(renderTemplate(operation.options.tag.name, tokens))}`);
  if (operation.options.execute) console.log(` execute ${pc.bold(operation.options.execute)}`);
  if (operation.options.push) console.log(`    push ${pc.cyan.bold('yes')}`);
  if (operation.options.install) console.log(` install ${pc.cyan.bold('yes')}`);
  console.log();
  console.log(`    from ${pc.bold(operation.state.currentVersion)}`);
  console.log(`      to ${pc.green.bold(operation.state.newVersion)}`);
  console.log();
}

const run = async (cliOpts: Record<string, any> = {}) => {
  const quiet = Boolean(cliOpts.quiet);

  await versionBump({
    release: cliOpts.release,
    currentVersion: cliOpts.currentVersion,
    preid: cliOpts.preid,
    commit: cliOpts.commit,
    tag: cliOpts.tag,
    sign: cliOpts.sign,
    push: cliOpts.push,
    all: cliOpts.all,
    confirm: cliOpts.confirm,
    noVerify: cliOpts.noVerify,
    files: cliOpts.files,
    ignoreScripts: cliOpts.ignoreScripts,
    recursive: cliOpts.recursive,
    printCommits: cliOpts.printCommits,
    install: cliOpts.install,
    execute: cliOpts.execute,
    ...(quiet ? {} : { progress }),
  });
};

export const bump = async (opts: Record<string, any> = {}) => {
  try {
    await run(opts);
  } catch (error) {
    if (error instanceof Error) {
      console.error(pc.red(error.message));
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};
