/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */
import getTag from "./_internal/getTag";
import isObjectLike from "./isObjectLike";

/**
 * Checks if `value` is classified as an `Blob` object.
 *
 * @summary isBlob
 * @static
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isBlob(new Blob());
 * // => true
 *
 * isBlob(NaN);
 * // => false
 *
 */
function isBlob(value) {
  return isObjectLike(value) && getTag(value) === '[object Blob]';
}

export default isBlob;
