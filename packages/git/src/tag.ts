/**
 * Git tag
 */
import { execSync, type ExecSyncResult } from '@elinzy/core';

/**
 * Check tag whether exist on remote
 *
 * other run:
 * `git ls-remote --tags origin --list v0.1.1`
 *
 * @param value
 * @param opts
 */
export function isExistTagWithRemote(
  value: string = '',
  opts?: { cwd?: string; cmd?: string },
) {
  try {
    execSync('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${value}`], opts);

    return true;
  } catch (e) {
    // Command fails with code 1 and no output if the tag does not exist, even though `--quiet` is provided
    // https://github.com/sindresorhus/np/pull/73#discussion_r72385685
    return false;
  }
}

/**
 * Get current(HEAD) tag
 *
 */
export function getCurrentTag() {
  const r = execSync('git', [
    'tag',
    '--sort',
    'version:refname',
    '--points-at',
    'HEAD',
    '--list',
    '*',
  ]) as ExecSyncResult;

  return r.stdout
      ? r.stdout.toString().trim().split(/\r?\n/)
      : [];
}

/**
 * Get last tag
 * Get the closest tag to HEAD on the current branch
 *
 * @example
 * const stdout = getLastTag()
 * // => 'v0.1.1'
 */
export function getLastTag() {
  const r = execSync('git', [
    'describe',
    '--abbrev=0',
    '--tags',
  ]) as ExecSyncResult;

  return r.stdout;
}

/**
 * Get all tags list（local）
 *
 * @returns {Array} Returns an array of tags, sorted by creation date in ascending order.
 *
 * @example
 * const stdout = getTags()
 * // => ['v0.1.0']
 */
export function getTags() {
  const r = execSync('git', [
    'tag',
    '--sort=creatordate',
  ]) as ExecSyncResult;

  // if (r?.code !== 0) {
  //     throw new Error(r.stderr.toString());
  // }

  return r.stdout
    ? r.stdout.toString().trim().split(/\r?\n/)
    : [];
}
