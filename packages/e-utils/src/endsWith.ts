/**
 * Checks if `string` ends with the given target string.
 *
 * @since 0.4.10
 * @category String
 * @param {string} [value=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
 *
 * @example
 *
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 */
function endsWith(value: string, target: string, position?: number): boolean {
    const { length } = value;
    position = position === undefined ? length : +position;
    if (position < 0 || position !== position) {
        position = 0;
    } else if (position > length) {
        position = length;
    }
    const end = position;
    position -= target.length;
    return position >= 0 && value.slice(position, end) === target;
}

export default endsWith;
