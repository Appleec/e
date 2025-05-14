/**
 * Git branch
 */
import { exec } from '@elinzy/e-core';

/**
 * Get default branch from {main,master,gh-pages}
 */
export async function getDefaultBranch() {
    for (const branch of ['main', 'master', 'gh-pages']) {
        if (await isExistBranch(branch)) {
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
export async function isExistBranch(
    value: string = 'main',
    opts?: Record<string, any>,
) {
    try {
        await exec('git', [
            'show-ref',
            '--verify',
            '--quiet',
            `refs/heads/${value}`,
        ], opts);

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
 *
 * @example
 * const stdout = await getCurrentBranch()
 * // => 'main'
 */
export async function getCurrentBranch() {
    const r = await exec('git', [
        'symbolic-ref',
        '--short',
        'HEAD',
    ]);
    return r?.stdout
}
