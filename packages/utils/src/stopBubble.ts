/**
 * @author appleex
 * @date 2024-09-10 07:51
 */

/**
 * Stop the browser's bubbling behavior
 *
 * @summary stopBubble
 * @since 0.2.0
 * @category Dom
 *
 * @param {*} e The value to process.
 *
 * @example
 *
 * stopBubble();
 * // => void
 *
 */
function stopBubble(e: Event): void {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
}

export default stopBubble;
