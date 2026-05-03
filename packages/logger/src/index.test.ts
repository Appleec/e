// @ts-ignore
import { describe, expect, it } from 'vitest';

// @ts-ignore
import * as L from '.';

describe('index', () => {
  it('doing', () => {
    console.time('index');
    L.info('This is assigner');
    L.help('This is assigner');
    L.success('This is assigner');
    L.warn('This is assigner');
    L.error('This is assigner');
    L.spawn('This is assigner');
    L.plus('This is assigner');
    L.minus('This is assigner');
    L.done('This is assigner');
    L.valid('This is assigner');
    L.time('This is assigner');
    console.timeEnd('index');
  });
});
