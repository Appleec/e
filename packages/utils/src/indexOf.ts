import baseIndexOf from './_internal/baseIndexOf';
import toInteger from './toInteger';

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @since 0.4.12
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * indexOf([1, 2, 1, 2], 2)
 * // => 1
 *
 * // Search from the `fromIndex`.
 * indexOf([1, 2, 1, 2], 2, 2)
 * // => 3
 */
function indexOf(array, value, fromIndex) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    let index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
        index = Math.max(length + index, 0);
    }
    return baseIndexOf(array, value, index);
}

export default indexOf;
