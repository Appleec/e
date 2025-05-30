/**
 * @vitest-environment jsdom
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils
import hasClass from '../src/hasClass';

describe('hasClass', () => {
  it('should do something', () => {
    document.body.innerHTML = `<div class="wrapper">Hello world</div>`;
    const el = document.querySelector('.wrapper');

    // console.log('=>', hasClass(el, 'wrapper'));
    // console.log('=>', hasClass(el, null));
    expect(hasClass(el, '')).toBe(false);
    expect(hasClass(el, 'wrapper')).toBe(true);
    expect(hasClass(el, 'wrapper111')).not.toBe(true);
  });
})
