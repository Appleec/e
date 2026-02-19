/**
 * Checks if `value` is empty as an object.
 *
 * @summary isEmptyObject
 * @static
 * @since 1.0.4
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isEmptyObject({});
 * // => true
 *
 * isEmptyObject({ a: 1 });
 * // => false
 *
 */
function isEmptyObject(value) {
  // method: 1
  // for (const t in e) {
  //     return !1;
  // }
  // return !0;

  // method: 2
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return !Object.keys(value).length;
}

// console.log('=>', isEmptyObject({}));
// console.log('=>', isEmptyObject({ a: 1 }));

export default isEmptyObject;
