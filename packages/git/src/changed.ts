/**
 * Git changed
 */
import { execSync, type ExecSyncResult } from '@elinzy/core';
import path from 'node:path';

import { getLastTag } from './tag';
import { getRepoRoot } from './repo';

/**
 * Get last commit ID in current branch (refs)
 *
 * @example
 * const r = getCurrentCommitId()
 * // => '589a759bb602d03db64cacef24a472a4eef777bb'
 *
 * const r = etCurrentCommitId({ short: true })
 * // => 'eef777bb'
 * @param options
 */
export function getCurrentCommitId(
  options?: { short?: boolean },
) {
  if (!options)
    options = {};

  const r = execSync('git', [
    'rev-parse',
    ...(options.short ? ['--short'] : []),
    'HEAD',
  ]) as ExecSyncResult;

  return r.stdout ? r.stdout.toString() : '';
}

/**
 * Get first commit hash(long)
 *
 * @example
 * const stdout = getFirstCommitHash()
 * // => 589a759bb602d03db64cacef24a472a4eef777bb
 */
export function getFirstCommitHash() {
    const r = execSync('git', [
        'rev-list',
        '--max-parents=0',
        'HEAD',
    ]) as ExecSyncResult;
    return r.stdout ? r.stdout.toString().trim() : '';
}

/**
 * Get changed files since last tag
 *
 * @example
 * const stdout = getChangedFilesSinceLastTag()
 * // => ['package.json', 'README.md', 'index.ts']
 */
export function getChangedFilesSinceLastTag(
    opts?: { cwd?: string; ref?: string; fullPath?: boolean },
) {
  if (!opts)
    opts = {};
  // last tag
  const lastTag = getLastTag() as string;
  const r = execSync('git', ['diff', '--name-only', '--diff-filter=A', ...(lastTag ? [lastTag] : []), 'HEAD'], opts) as ExecSyncResult;
  const files = r.stdout
    ? r.stdout
      .toString()
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
    : [];

  if (!opts.fullPath) return files;

  const repoRoot = getRepoRoot(opts);
  return files.map((f) => path.resolve(repoRoot, f));
}
