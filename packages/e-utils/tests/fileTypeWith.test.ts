/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';

// Utils
import fileTypeWith from '../src/fileTypeWith';
import { only } from 'node:test';

describe('noop', () => {
  it('should do something', () => {
    // console.log('=>', fileTypeWith('t', 'abbrev'))
    // console.log('=>', fileTypeWith('zip', {
    //   field: 'mimeType',
    //   abbrev: true,
    // }))
    // console.log('=>', fileTypeWith());

    // console.log('=>', fileTypeWith('png', { field: 'extension', abbrev: true, only: true }))

    expect(fileTypeWith('png', { field: 'extension', abbrev: true })).toEqual(['image/png']);
  });
});
