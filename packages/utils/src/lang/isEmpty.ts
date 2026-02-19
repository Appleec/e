import baseKeys from '../_internal/baseKeys';
import isPrototype from '../_internal/isPrototype';
import getTag from '../lang/getTag';
import isArguments from '../lang/isArguments';
import isArray from '../lang/isArray';
import isArrayLike from '../lang/isArrayLike';
import isBuffer from '../lang/isBuffer';
import isTypedArray from '../lang/isTypedArray';

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

/** Used for built-in method references. */
const objectProto = Object.prototype;

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @summary isEmpty
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null);
 * // => true
 *
 * isEmpty(true);
 * // => true
 *
 * isEmpty(1);
 * // => true
 *
 * isEmpty([1, 2, 3]);
 * // => false
 *
 * isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

// console.log('=>', isEmpty(null));
// console.log('=>', isEmpty(true));
// console.log('=>', isEmpty([1, 2, 3]));
// console.log('=>', isEmpty({ 'a': 1 }));

// old
// function isEmpty(val) {
//   // null or undefined
//   if (val == null) return true;
//
//   if (typeof val === 'boolean') return false;
//
//   if (typeof val === 'number') return !val;
//
//   if (val instanceof Error) return val.message === '';
//
//   switch (Object.prototype.toString.call(val)) {
//       // String or Array
//     case '[object String]':
//     case '[object Array]':
//       return !val.length;
//
//       // Map or Set or File
//     case '[object File]':
//     case '[object Map]':
//     case '[object Set]': {
//       return !val.size;
//     }
//       // Plain Object
//     case '[object Object]': {
//       return !Object.keys(val).length;
//     }
//   }
//
//   return false;
// }

export default isEmpty;
