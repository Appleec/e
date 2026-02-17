/**
 *  Create by appleex on 2022/4/26 3:43 下午.
 */
import getStyle from './getStyle';

/**
 * Check if an element is scrollable
 *
 * @summary isScroll
 * @since 0.2.0
 * @category DOM
 *
 * @param {HTMLDocument} el HTMLDocument
 * @param {boolean} vertical vertical
 *
 * @return {void | * | SnapshotReturnOptions | RegExpMatchArray | Promise<Response | undefined>}
 *
 * @example
 *
 * // <div id="wrapper" style="overflow: scroll;"></div>
 * const el = document.querySelector('div')
 *
 * isScroll(el);
 * // => true
 */
function isScroll(el: Element, vertical?: any): boolean {
    const determinedDirection = vertical !== null && vertical !== undefined;

    // const { overflow } = getComputedStyle(el);
    const overflow = determinedDirection
        ? vertical
            ? getStyle(el, 'overflow-y')
            : getStyle(el, 'overflow-x')
        : getStyle(el, 'overflow');

    return overflow.match(/(scroll|auto|overlay)/);
}

export default isScroll;
