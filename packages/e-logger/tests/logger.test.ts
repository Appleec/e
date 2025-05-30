import { describe, expect, it } from 'vitest';

import { createLogger, Logger } from '../src/Logger';

describe('e-logger', () => {
  it('should do something', () => {
    console.time('e-logger');

    const L = new Logger();
    L.info('Build e-logger');

    console.timeEnd('e-logger');
  })
})
