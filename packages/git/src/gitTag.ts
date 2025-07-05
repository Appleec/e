/**
 * Git tag
 */
import { exec } from '@elinzy/core';

/**
 * Check tag whether exist on remote
 *
 * other run:
 * `git ls-remote --tags origin --list v0.1.1`
 *
 * @param value
 * @param opts
 */
export async function isExistTagWithRemote(
    value: string = '',
    opts?: Record<string, any>,
) {
    try {
        await exec('git', [
            'rev-parse',
            '--verify',
            '--quiet',
            `refs/tags/${value}`,
        ], opts);

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
export async function getCurrentTag() {
    const r = await exec('git', [
        'tag',
        '--sort',
        'version:refname',
        '--points-at',
        'HEAD',
        '--list',
        '*',
    ]);

    return r?.stdout
        ? r.stdout.toString().trim().split(/\r?\n/)
        : [];
}

/**
 * Get last tag
 *
 * @example
 * const stdout = await getLastTag()
 * // => 'v0.1.1'
 */
export async function getLastTag() {
    const r = await exec('git', [
        'describe',
        '--abbrev=0',
        '--tags',
    ]);

    return r?.stdout;
}

/**
 * Get all tags list（local）
 *
 * @returns {Array} Returns an array of tags, sorted by creation date in ascending order.
 *
 * @example
 * const stdout = await getAllTags()
 * // => ['v0.1.0']
 */
export async function getAllTags() {
    const r = await exec('git', [
        'tag',
        '--sort=creatordate',
    ]);

    // if (r?.code !== 0) {
    //     throw new Error(r.stderr.toString());
    // }

    return r?.stdout
        ? r.stdout.toString().trim().split(/\r?\n/)
        : [];
}
