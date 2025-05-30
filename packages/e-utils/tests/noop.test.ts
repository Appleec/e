/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';

// Utils
import noop from '../src/noop';

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function');
  });

  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
  });
});
