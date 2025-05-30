import { describe, expect, it } from 'vitest';

import * as L from '../src';

describe('e-logger', () => {
  it('should do something', () => {
    console.time('e-logger');

    L.success({ fit: false, chip: true, text: 'SUCCESS' }, 'Build e-logger');

    console.timeEnd('e-logger');
  })
})
