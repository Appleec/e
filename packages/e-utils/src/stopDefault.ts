/**
 * @author appleex
 * @date 2024-09-10 07:45
 */

/**
 * Block the browser's default behavior
 *
 * @summary stopDefault
 * @static
 * @since 0.2.0
 * @category Dom
 *
 * @param {*} e The value to process.
 *
 * @example
 *
 * stopDefault();
 * // => void
 *
 */
function stopDefault(e: Event): void {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

export default stopDefault;
