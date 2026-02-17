/**
 * @author appleex
 * @date 2024-09-04 06:03
 */
import hasClass from './hasClass';

/**
 * `DOM` element adds a new `class`.
 *
 * @since 0.2.0
 * @category DOM
 * @param {Element} element HTMLElement.
 * @param {String} className Class Name.
 * @returns {void} This function does not return anything.
 * @example
 *
 * // `<div class="wrapper">Hello world</div>`
 * var el = document.querySelector('.wrapper');
 *
 * addClass(el, 'container');
 * // => "<div class='wrapper container'>Hello world</div>"
 */
function addClass(element: Element, className: string): void {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

export default addClass;
