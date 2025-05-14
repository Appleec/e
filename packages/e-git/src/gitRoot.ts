/**
 * Git root(repo)
 */
import { exec } from '@elinzy/e-core';

/**
 * Get Git client version
 */
export async function getGitVersion() {
    const r = await exec('git', ['version']);
    const match = /git version (?<version>\d+\.\d+\.\d+).*/.exec(r?.stdout);
    return match && match.groups?.version;
}

/**
 * Check The head whether detached
 * Command will fail with code 1 if the HEAD is detached.
 */
export async function isDetachedWithHead() {
    try {
        await exec('git', [
            'symbolic-ref',
            '--quiet',
            'HEAD',
        ]);

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
export async function isChangedWithFetchRemote() {
    const r = await exec('git', ['fetch', '--dry-run']);

    // There are no unfetched changes if output is empty.
    return !r.stdout || r.stdout === '';
}

/**
 * Check worktree whether clean
 *
 * throw new Error('Unclean working tree. Commit or stash changes first.')
 */
export async function isCleanWithWorkingTree() {
    try {
        const r = await exec('git', [
            'status',
            '--porcelain',
        ]);

        return !(r && r.stdout !== '');
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
export async function isCleanWithRemoteHistory() {
    const r = await exec('git', [
        'rev-list',
        '--count',
        '--left-only',
        '@{u}...HEAD',
    ]);

    // Remote history is clean if there are 0 revisions.
    return r.stdout === '0';
}

/**
 * Check remote whether exist
 *
 * @returns {boolean} Returns `true` if `value` is exist, else `false`
 */
export async function isExistRemote() {
    try {
        const r = await exec('git', [
            'rev-parse',
            '@{u}',
        ]);
        return true;
    } catch (e) {
        // Has no remote if command fails
        return false;
    }
}

/**
 * Check current repo whether git-dir
 */
export async function isGitRepo(): Promise<boolean> {
    try {
        // Return `.git`
        await exec('git', ['rev-parse', '--git-dir']);

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
 * const stdout = await getRepoRoot()
 * // => '/<repo_root>'
 */
export async function getRepoRoot(
    opts?: { cwd?: string, cmd?: string },
) {
    const r = await exec('git', [
        'rev-parse',
        '--show-toplevel',
    ], { cwd: opts?.cwd });
    return r?.stdout
        .toString()
        .trim()
        .replace(/[\n\r]/g, "");
}
