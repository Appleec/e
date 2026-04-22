/**
 * Git root(repo)
 */
import {
  execSync,
  type ExecSyncResult,
  type ExecResult,
} from '@elinzy/core';

/**
 * Get Git client version
 */
export function getGitVersion() {
  const r = execSync('git', ['version']) as ExecResult;
  const match = /git version (?<version>\d+\.\d+\.\d+).*/.exec(r.stdout as string);
  return match && match.groups && match.groups.version;
}

/**
 * Check The head whether detached
 * Command will fail with code 1 if the HEAD is detached.
 */
export function isDetachedWithHead() {
  try {
    // @ts-ignore
    const r = execSync('git', ['symbolic-ref', '--quiet', 'HEAD']) as ExecSyncResult;

    return false;
  } catch (e) {
      return true;
  }
}

/**
 * Check remote whether unfetched changes
 *
 * throw new Error('Remote history differs. Please run `git fetch` and pull changes.')
 */
export function isChangedWithFetchRemote() {
  const r = execSync('git', ['fetch', '--dry-run']) as ExecSyncResult;

  // There are no unfetched changes if output is empty.
  return r.stdout === '';
}

/**
 * Check worktree whether clean
 *
 * throw new Error('Unclean working tree. Commit or stash changes first.')
 */
export function isCleanWithWorkingTree() {
  try {
    const r = execSync('git', ['status', '--porcelain']) as ExecSyncResult;

    // @ts-ignore
    return r.stdout === '';
  } catch (e) {
    return false;
  }
}

/**
 * Check remote history whether clean
 *
 * throw new Error('Remote history differs. Please pull changes.')
 * @returns {boolean} Returns `true` if `value` is exist, else `false`
 */
export function isCleanWithRemoteHistory() {
  const r = execSync('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']) as ExecSyncResult;

  // Remote history is clean if there are 0 revisions.
  return r.stdout === '0';
}

/**
 * Check remote whether exist
 *
 * @returns {boolean} Returns `true` if `value` is exist, else `false`
 */
export function isExistRemote() {
  try {
    // @ts-ignore
    const r = execSync('git', ['rev-parse', '@{u}']) as ExecSyncResult;
    return true;
  } catch (e) {
    // Has no remote if command fails
    return false;
  }
}

/**
 * Check current repo whether git-dir
 */
export function isGitRepo() {
  try {
    // Return `.git`
    // @ts-ignore
    const r = execSync('git', ['rev-parse', '--git-dir']) as ExecSyncResult;
    return true;
  } catch {
    return false;
  }
}

/**
 * Get top-level for GitRepoRoot
 *
 * @returns {string} Returns GitRepoRoot
 * @example
 * const stdout = getRepoRoot()
 * // => '/<repo_root>'
 */
export function getRepoRoot(
    opts?: { cwd?: string, cmd?: string },
) {
  const r = execSync('git', ['rev-parse', '--show-toplevel'], { ...opts }) as ExecSyncResult;

  return (
    r.stdout
      ? r.stdout
        .toString()
        .trim()
        .replace(/[\n\r]/g, '')
      : ''
  );
}
