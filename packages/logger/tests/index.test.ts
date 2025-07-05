import { describe, expect, it } from 'vitest';

import * as L from '../src';

describe('e-logger', () => {
  it('should do something', () => {
    console.time('e-logger');

    // compact
    console.log('=>compact',);
    L.help('Build e-logger');
    L.warn('Build e-logger');
    L.error('Request failed');
    L.success('Created dist in 20ms');
    L.info('Build e-logger');
    // L.log('Build e-logger');

    // compact/extend
    console.log('=>compact/extend',);
    L.spawn('npm install @elinzy/e-logger -D');
    L.plus('Add 2 files');
    L.minus('Remove 2 files');
    L.valid('Option-1');
    L.done('Option-1');
    L.time('Output log file');

    // complex
    console.log('=>complex',);
    L.success({ timestamp: true }, 'Build e-logger');
    L.success({ fit: true }, 'Build e-logger');
    L.success({ chip: true, text: 'SUCCESS' }, 'Build e-logger');
    L.error({ fit: false, chip: true, text: 'ERROR' }, 'Build e-logger');
    L.warn({ fit: true, chip: true, text: 'CONFLICT' }, 'Build e-logger');

    console.timeEnd('e-logger');
  })
})
