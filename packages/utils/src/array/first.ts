/**
 * Gets the first element of `array`.
 *
 * @since 0.4.11
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
function first(array) {
    return array != null && array.length ? array[0] : undefined;
}

export default first;
