import baseSum from './_internal/baseSum';

/**
 * Computes the sum of the values in `array`.
 *
 * @since 0.4.11
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * sum([4, 2, 8, 6])
 * // => 20
 */
function sum(array) {
    return array != null && array.length ? baseSum(array, (value) => value) : 0;
}

// console.log('=>', sum([1, 2]));

export default sum;
