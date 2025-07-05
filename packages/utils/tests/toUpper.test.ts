/**
 * @vitest-environment node
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils
import toUpper from '../src/toUpper';

describe('toUpper', () => {
  it('should chart to Upper', () => {
    expect(toUpper('--foo-bar--')).toEqual('--FOO-BAR--');
    expect(toUpper('fooBar')).toEqual('FOOBAR');
  });
})