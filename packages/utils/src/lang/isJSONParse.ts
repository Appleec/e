/**
 * Checks if `value` is a JSON format
 *
 * @summary isJSONParse
 * @since 0.2.0
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isJSONParse(JSON.stringify({a: 1}));
 * // => true
 *
 * isJSONParse({});
 * // => false
 *
 * isJSONParse(null);
 * // => false
 */
function isJSONParse(value) {
  try {
    const parsed = JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

// console.log('=>', isJSONParse({}));
// console.log('=>', isJSONParse('{}'));
// console.log('=>', isJSONParse(null));
// console.log('=>', isJSONParse(true));
// console.log('=>', isJSONParse('{ "a": 1, "b": 1 }'));
// console.log('=>', isJSONParse('[1, 2, 3]'));

export default isJSONParse;
