/**
 * Checks if `value` is a JSON format
 *
 * @summary isJSONStringify
 * @since 0.2.0
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isJSONStringify(1);
 * // => true
 *
 * isJSONStringify({});
 * // => true
 *
 * isJSONStringify(null);
 * // => true
 */
function isJSONStringify(value) {
  try {
    const stred = JSON.stringify(value);
    return true;
  } catch (e) {
    return false;
  }
}

export default isJSONStringify;
