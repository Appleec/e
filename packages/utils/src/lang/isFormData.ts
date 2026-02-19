import getTag from './getTag';
/**
 * Checks if `value` is classified as an `FormData` object.
 *
 * @summary isPromise
 * @static
 * @since 0.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isFormData(new FormData());
 * // => true
 *
 */
function isFormData(value) {
  return getTag(value) === '[object FormData]';
}

// console.log('=>', isFormData(new FormData()));

export default isFormData;
