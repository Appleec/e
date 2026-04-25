import { describe, it } from 'vitest';

import {
  getCurrentCommitId,
} from './changed';

describe('git:changed', () => {
  it('=> getCurrentCommitId', () => {
    console.log('=>', getCurrentCommitId());

    console.log('=>', getCurrentCommitId({ short: true }));
  });
});
