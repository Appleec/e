/**
 * @author appleex
 * @date 2024-09-09 17:39
 */
import isNumber from "./isNumber";

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * @name isNumberLike
 * @since 0.2.0
 * @category Lang
 * @summary isNumberLike
 * @param {*} value - *
 * @return {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * isNumberLike(3);
 * // => true
 *
 * isNumberLike(Number.MIN_VALUE);
 * // => true
 *
 * isNumberLike(Infinity);
 * // => true
 *
 * isNumberLike('3');
 * // => false
 *
 * isNumberLike(NaN);
 * // => false
 *
 */
function isNumberLike(value: any): boolean {
    return isNumber(value) && !isNaN(value);
}

export default isNumberLike;
