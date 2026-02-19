/**
 * @author appleex
 * @date 2025-08-25 14:58
 */

/**
 * Checks if `value` is empty as an object.
 *
 * @summary isEmptyObject
 * @static
 * @since 0.1.0
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
 */
function isEmptyObject(value: any): boolean {
  // eg: 1
  // for (const t in e) {
  //     return !1;
  // }
  // return !0;

  // eg: 2
  if (!value || typeof value !== "object" || Array.isArray(value))
    return false;
  return !Object.keys(value).length;
}

export default isEmptyObject;
