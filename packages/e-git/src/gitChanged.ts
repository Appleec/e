/**
 * Git changed
 */
import { exec } from '@elinzy/e-core';
import path from 'node:path';

import { getLastTag } from './gitTag';
import { getRepoRoot } from './gitRoot';

/**
 * Get first commit hash(long)
 *
 * @example
 * const stdout = await getFirstCommitHash()
 * // => 589a759bb602d03db64cacef24a472a4eef777bb
 */
export async function getFirstCommitHash() {
    const r = await exec('git', [
        'rev-list',
        '--max-parents=0',
        'HEAD',
    ]);
    return r?.stdout
        .toString()
        .trim();
}

/**
 * Get changed files since last tag
 *
 * @example
 * const stdout = await getChangedFilesSinceLastTag()
 * // => ['package.json', 'README.md', 'index.ts']
 */
export async function getChangedFilesSinceLastTag(
    opts?: { cwd?: string; ref?: string; fullPath?: boolean }
) {
    console.log('=>', opts)
    // last tag
    const lastTag = await getLastTag();
    const r = await exec('git', [
        'diff',
        '--name-only',
        '--diff-filter=A',
        ...(lastTag ? [lastTag] : []),
        'HEAD',
    ], { cwd: opts?.cwd });
    const files = r?.stdout
        ? r.stdout
            .toString()
            .trim()
            .split(/\r?\n/)
            .filter(Boolean)
        : [];

    if (!opts?.fullPath) return files;

    const repoRoot = await getRepoRoot({ cwd: opts.cwd });
    return files.map((f) => path.resolve(repoRoot, f));
}
