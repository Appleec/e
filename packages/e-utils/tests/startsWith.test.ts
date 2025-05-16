/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';

// Utils
import startsWith from '../src/startsWith';

describe('startsWith', () => {
  it('should do something', () => {
    expect(startsWith('abc', 'a')).toBe(true);
    expect(startsWith('abc', 'b')).toBe(false);
    expect(startsWith('abc', 'b', 1)).toBe(true);
  });
});
