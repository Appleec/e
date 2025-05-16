/**
 * @author appleex
 * @date 2024-09-04 05:51
 */

/**
 * Determine whether a `DOM` element has a `class` attribute.
 *
 * @since 0.2.0
 * @category DOM
 * @param {Element} element The value is Element.
 * @param {string} className The value is ClassName.
 * @returns {boolean} `true` if `element` is Element, `false` otherwise.
 * @example
 *
 * var el = document.querySelector('.wrapper');
 *
 * hasClass(el, 'wrapper');
 * // => true
 *
 */
function hasClass(element: Element, className: string): boolean {
    return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

export default hasClass;
