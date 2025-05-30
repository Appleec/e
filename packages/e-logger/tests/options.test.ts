import { describe, expect, it } from 'vitest';

import * as L from '../src';

describe('e-logger', () => {
  it('should do something', () => {
    console.time('e-logger');

    L.valid({ fit: false }, 'Item-1');
    L.valid({ fit: false, indent: 1 }, 'Item-1-1');

    console.timeEnd('e-logger');
  })
})
