import type { VersionBumpOptions, VersionBumpProgress, VersionBumpResults } from './types';
import process from 'node:process';
import pc from 'ansis';
import prompts from 'prompts';
import { onCancel, onPromptState } from '@/utils/functions';
import { getCurrentVersion } from './get-current-version';
import { getNewVersion } from './get-new-version';
import { gitCommit, gitPush, gitTag } from './git';
import { Operation } from './operation';
import { runNpmScript } from './run-npm-script';
import { buildTokens, renderTemplate } from './tokens';
import { NpmScript, ProgressEvent } from './types';
import { updateFiles } from './update-files';

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
 * Bumps the version number in one or more files, prompting the user if necessary.
 * Optionally also commits, tags, and pushes to git.
 */
async function versionBump(options: VersionBumpOptions): Promise<VersionBumpResults> {
  const operation = await Operation.start(options);

  // Get the old and new version numbers
  await getCurrentVersion(operation);
  await getNewVersion(operation);

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

function printSummary(operation: Operation) {
  const tokens = buildTokens(operation);
  console.log();
  console.log(`   files ${operation.options.files.map((i) => pc.bold(i)).join('\n         ')}`);
  if (operation.options.commit)
    console.log(`  commit ${pc.bold(renderTemplate(operation.options.commit.message, tokens))}`);
  if (operation.options.tag)
    console.log(`     tag ${pc.bold(renderTemplate(operation.options.tag.name, tokens))}`);
  if (operation.options.push) console.log(`    push ${pc.cyan.bold('yes')}`);
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
