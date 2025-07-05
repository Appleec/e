/**
 * @vitest-environment jsdom
 */
// Imports
import {describe, expect, it} from 'vitest';

// Utils
import fileToBase64 from '../src/fileToBase64';

describe('fileToBase64', () => {
  it('should do something', async () => {
    const value = new File(['Hello world'], 'file.txt', { type: "text/plain" });

    // console.log('=>', [value, value.size, value.type]);
    // console.log('=>', await fileToBase64(value));
    expect(await fileToBase64(value)).toEqual('data:text/plain;base64,SGVsbG8gd29ybGQ=');
    expect(await fileToBase64(value, 'abbrev')).toEqual('SGVsbG8gd29ybGQ=');
    expect(await fileToBase64(value, { abbrev: true })).toEqual('SGVsbG8gd29ybGQ=');
  });
})
