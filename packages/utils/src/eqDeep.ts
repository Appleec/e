// @ts-nocheck
import baseIsEqual from './_internal/baseIsEqual.js';

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * isEqual(object, other)
 * // => true
 *
 * object === other
 * // => false
 */
function isEqual(value, other) {
    return baseIsEqual(value, other);
}

// const object = { 'a': 2 }
// const other = { 'a': 1 }
//
// console.log('=>', isEqual(object, other))

export default isEqual;
