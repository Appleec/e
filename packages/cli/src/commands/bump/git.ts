import type { Operation } from './operation';
import { exec } from '@elinzy/core';
import { buildTokens, renderTemplate } from './tokens';
import { ProgressEvent } from './types';

/**
 * Commits the modified files to Git, if the `commit` option is enabled.
 */
export async function gitCommit(operation: Operation): Promise<Operation> {
  if (!operation.options.commit) return operation;

  const { all, noVerify, message } = operation.options.commit;
  const { updatedFiles } = operation.state;
  let args = ['--allow-empty'];

  if (all) {
    // `git commit --all` only stages already-tracked files, so it misses new
    // files created by an `--execute` script (e.g. a generated changelog).
    // Stage everything explicitly first so those are included too.
    await exec('git', ['add', '--all'], { stdio: 'inherit' });
    args.push('--all');
  }

  if (noVerify) {
    // Bypass git commit hooks
    args.push('--no-verify');
  }
  // Sign the commit with a GPG/SSH key
  if (operation.options.sign) {
    args.push('--gpg-sign');
  }

  // Create the commit message
  const commitMessage = renderTemplate(message, buildTokens(operation));
  args.push('--message', commitMessage);

  // Append the file names last, as variadic arguments
  if (!all) args = [...args, ...updatedFiles];

  await exec('git', ['commit', ...args], { stdio: 'inherit' });

  return operation.update({ event: ProgressEvent.GitCommit, commitMessage });
}

/**
 * Tags the Git commit, if the `tag` option is enabled.
 */
export async function gitTag(operation: Operation): Promise<Operation> {
  if (!operation.options.tag) return operation;

  const { commit, tag } = operation.options;
  const tokens = buildTokens(operation);

  const args = [
    // Create an annotated tag, which is recommended for releases.
    // See https://git-scm.com/docs/git-tag
    '--annotate',

    // Use the same commit message for the tag
    '--message',
    renderTemplate(commit!.message, tokens),
  ];

  // Create the Tag name
  const tagName = renderTemplate(tag.name, tokens);
  args.push(tagName);

  // Sign the tag with a GPG/SSH key
  if (operation.options.sign) {
    args.push('--sign');
  }

  await exec('git', ['tag', ...args], { stdio: 'inherit' });

  return operation.update({ event: ProgressEvent.GitTag, tagName });
}

/**
 * Pushes the Git commit and tag, if the `push` option is enabled.
 */
export async function gitPush(operation: Operation): Promise<Operation> {
  if (!operation.options.push) return operation;

  // Push the commit
  await exec('git', ['push'], { stdio: 'inherit' });

  if (operation.options.tag) {
    // Push the tag
    await exec('git', ['push', '--tags'], { stdio: 'inherit' });
  }

  return operation.update({ event: ProgressEvent.GitPush });
}
