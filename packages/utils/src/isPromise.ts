/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */

/**
 * Checks if `value` is classified as an `Promise` object.
 *
 * @summary isPromise
 * @static
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isPromise(new Promise());
 * // => true
 *
 * isPromise(NaN);
 * // => false
 *
 */
function isPromise(value) {
  return value && typeof value.then === 'function';
}

export default isPromise;
