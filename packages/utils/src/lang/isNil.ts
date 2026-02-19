/**
 * @author appleex
 * @date 2024-08-25 15:15
 */

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 */
function isNil(value: any): boolean {
    return value == null;
}

export default isNil;
