import isArrayLike from '../isArrayLike';
import isIndex from './isIndex';
import isObject from '../isObject';
import eq from '../eq';

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  const type = typeof index;
  if (type === 'number'
    ? (isArrayLike(object) && isIndex(index, object.length))
    : (type === 'string' && index in object)
  ) {
    return eq(object[index], value);
  }
  return false;
}

export default isIterateeCall;
