import { describe, it } from 'vitest';

import {
    // gitRoot
    getRepoRoot,
    isExistRemote,
    isCleanWithRemoteHistory,
    isCleanWithWorkingTree, getGitVersion,
    // gitChanged
    getChangedFilesSinceLastTag,
    getFirstCommitHash,
    // gitTag
    isExistTagWithRemote,
    getLastTag,
    getAllTags,
    // gitBranch
    isExistBranch,
    getCurrentBranch,
    getDefaultBranch,
} from '../src'

describe('e-git', () => {
    describe('gitChanged', () => {
        it('should getFirstCommitHash', async () => {
            console.log('=>', await getFirstCommitHash());
        });
        it('should getChangedFilesSinceLastTag', async () => {
            console.log('=>', await getChangedFilesSinceLastTag());
        });
    });

    describe('gitTag', () => {
        it('should isExistTagWithRemote', async () => {
            console.log('=>', await isExistTagWithRemote('v0.1.0'));
        });
        it('should getLastTag', async () => {
            console.log('=>', await getLastTag());
        });
        it('should getAllTags', async () => {
            console.log('=>', await getAllTags());
        });
    });

    describe('gitBranch', () => {
        it('should getDefaultBranch', async () => {
            console.log('=>', await getDefaultBranch());
        });
        it('should isExistBranch', async () => {
            console.log('=>', await isExistBranch());
            console.log('=>', await isExistBranch('master'));
            console.log('=>', await isExistBranch('main', { logger: true }));
        });
        it('should getCurrentBranch', async () => {
            console.log('=>', await getCurrentBranch());
        });
    });

    describe('gitRoot', () => {
        it('should getGitVersion', async () => {
            console.log('=>', await getGitVersion());
        });
        it('should isCleanWithWorkingTree', async () => {
            console.log('=>', await isCleanWithWorkingTree());
        });
        it('should isCleanWithRemoteHistory', async () => {
            console.log('=>', await isCleanWithRemoteHistory());
        });
        it('should isExistRemote', async () => {
            console.log('=>', await isExistRemote());
        });
        it('should getRepoRoot', async () => {
            console.log('=>', await getRepoRoot());
        });
    })
});
