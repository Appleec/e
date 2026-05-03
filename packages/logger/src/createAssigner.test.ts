// @ts-ignore
import { describe, expect, it } from 'vitest';

import createAssigner from './createAssigner';

describe('createAssigner', () => {
  it('creates a new assigner', () => {
    console.time('createAssigner');
    const L = createAssigner({
      timeEnabled: false,
      symbolEnabled: false,
      paintEnabled: true,
      variant: 'text',
      type: 'success',
      // symbol: '>',
      // tag: '>>',
    });
    L('This is assigner https://baidu.com');
    console.timeEnd('createAssigner');
  });
});
