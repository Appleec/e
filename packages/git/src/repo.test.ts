import { describe, it } from 'vitest';

import {
  isGitRepo,
  getRepoRoot,
  isCleanWithWorkingTree,
} from './root';

describe('git:root', () => {
  it('=> isCleanWithWorkingTree', () => {
    console.log('=>', isCleanWithWorkingTree());
  });

  it('=> isGitRepo', () => {
    console.log('=>', isGitRepo());
  });

  it('=> getRepoRoot', () => {
    console.log('=>', getRepoRoot());
  });
});
