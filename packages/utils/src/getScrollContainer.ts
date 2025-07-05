/**
 *  Create by appleex on 2022/4/26 3:43 下午.
 */
import isScroll from './isScroll';

/**
 * Get scroll element container
 *
 * @summary getScrollContainer
 * @since 0.2.0
 * @category DOM
 *
 * @param {HTMLDocument} el HTMLDocument
 * @param {boolean} vertical vertical
 * @return {{enumerable: boolean}|TreeWalker.parentNode|exports.TreeWalkerImpl.parentNode|(() => (Node | null))|ActiveX.IXMLDOMNode|(Node & ParentNode)|Window}
 *
 * @example
 *
 * // <div id="wrapper" style="overflow: scroll;"></div>
 * const el = document.querySelector('div')
 *
 * getScrollContainer(el);
 * // => window or target
 */
function getScrollContainer(el, vertical) {
    let parent = el;

    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if (isScroll(parent, vertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }

    return parent;
}

export default getScrollContainer;
