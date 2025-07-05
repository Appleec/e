/**
 * @vitest-environment jsdom
 */
// Imports
import { describe, expect, it } from 'vitest';

// Utils
import isElement from '../src/isElement';

describe('isElement', () => {
  document.body.innerHTML = `<div class="wrapper">Hello world</div>`;

  const el = document.querySelector('.wrapper');

  it('should return `true` for DOM elements', () => {
    expect(isElement(el)).toBe(true);
  });
})