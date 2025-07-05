/**
 * @vitest-environment jsdom
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils
import base64ToFile from '../src/base64ToFile';

describe('base64ToFile', () => {
  it('should do something', () => {
      const result = base64ToFile('data:text/plain;SGVsbG8gd29ybGQ=', {
        fileName: 'a.txt',
        // mimeType: 'image/png',
      });
      // const result = base64ToFile('data:text/plain;base64,SGVsbG8gd29ybGQ=', 'file.txt');
      // const result = base64ToFile('SGVsbG8gd29ybGQ=', 'file.txt');
      // console.log('=>', result);
  });
})
