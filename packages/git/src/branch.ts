/**
 * Git branch
 */
import { execSync, type ExecSyncResult } from '@elinzy/core';

/**
 * Get default branch from {main,master,gh-pages}
 */
export function getDefaultBranch() {
    for (const branch of ['main', 'master', 'gh-pages']) {
        if (isExistBranch(branch)) {
            return branch;
        }
    }

    throw new Error('Could not infer the default Git branch. Please specify one with the --branch flag or with a np config.');
}

/**
 * Check local branch list
 *
 * @param {string} [value = 'main'] Branch, default value is 'main'
 * @param {*} opts Options configuration
 * @returns {boolean} Returns `true` if `value` is exist, else `false`
 * @example
 * const stdout = await isExistBranch('main')
 * // => true
 *
 */
export function isExistBranch(
  value: string = 'main',
  opts?: { cwd?: string; cmd?: string },
) {
  try {
    // @ts-ignore
    const r = execSync('git', ['show-ref', '--verify', '--quiet', `refs/heads/${value}`], opts) as ExecSyncResult;

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get current branch
 *
 * @description
 * `git symbolic-ref --short HEAD`
 * `git rev-parse --abbrev-ref HEAD`
 *
 * @example
 * const stdout = getCurrentBranch()
 * // => 'main'
 */
export function getCurrentBranch() {
  const r = execSync('git', [
    'symbolic-ref',
    '--short',
    'HEAD',
  ]) as ExecSyncResult;
  return r.stdout;
}
