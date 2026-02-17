/**
 * @author appleex
 * @date 2024-09-10 21:50
 */
import hasClass from './hasClass';

/**
 * Remove a specified `class` from a `DOM` element.
 *
 * @since 0.2.0
 * @category DOM
 * @param {Element} el HTMLElement.
 * @param {string} className className.
 * @returns {void} This function does not return anything.
 *
 * @example
 *
 * // `<div class="wrapper container"></div>`
 * var el = document.querySelector('.wrapper');
 *
 * removeClass(el, 'container');
 * // => <div class="wrapper "></div>
 *
 */
function removeClass(el: Element, className: string): void {
    if (hasClass(el, className)) {
        const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

export default removeClass;
