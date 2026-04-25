import { describe, it } from 'vitest';

import {
  isGitRepo,
  getRepoRoot,
  isCleanWithWorkingTree,
} from './repo';

describe('git:repo', () => {
  it('=> isCleanWithWorkingTree', () => {
    console.log('=>', isCleanWithWorkingTree())
  })

  it('=> isGitRepo', () => {
    console.log('=>', isGitRepo())
  })

  it('=> getRepoRoot', () => {
    console.log('=>', getRepoRoot())
  })
})
