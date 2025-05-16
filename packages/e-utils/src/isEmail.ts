/**
 * Checks if `value` is an email.
 *
 * @summary isEmail
 * @name isEmail
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isEmail('12345@qq.com');
 * // => true
 *
 * isEmail(NaN);
 * // => false
 *
 */
function isEmail(value: any): boolean {
  // /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
}

export default isEmail;
