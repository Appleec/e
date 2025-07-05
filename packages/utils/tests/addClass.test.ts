/**
 * @vitest-environment jsdom
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils
import addClass from '../src/addClass';
import hasClass from '../src/hasClass';

describe('addClass', () => {
  it('should do something', () => {
    document.body.innerHTML = `<div class="wrapper">Hello world</div>`;
    const el = document.querySelector('.wrapper');

    addClass(el, 'container');

    // console.log('=>', el.className);
    expect(hasClass(el, 'container')).toBe(true);
    expect(hasClass(el, 'container111')).not.toBe(true);
  });
})
