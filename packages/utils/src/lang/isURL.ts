/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */

/**
 * Checks if `value` is a URL.
 *
 * @summary isURL
 * @static
 * @since 0.2.0
 * @category Lang
 * @param {string} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isURL('https://www.baidu.com');
 * // => true
 *
 * isURL('https://127.0.0.1');
 * // => false
 *
 */
function isURL(value) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(value);
}

export default isURL;
