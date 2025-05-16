/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */
import getTag from "./_internal/getTag";
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as an `File` object.
 *
 * @summary isFile
 * @static
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isFile(new File());
 * // => true
 *
 * isFile(NaN);
 * // => false
 *
 */
function isFile(value) {
  return isObjectLike(value) && getTag(value) === '[object File]';
}

export default isFile;
