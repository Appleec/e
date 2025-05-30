/**
 * Checks if `string` starts with the given target string.
 *
 * @since 0.4.10
 * @category String
 * @param {string} [value=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
 * @see endsWith, includes
 * @example
 *
 * startsWith('abc', 'a')
 * // => true
 *
 * startsWith('abc', 'b')
 * // => false
 *
 * startsWith('abc', 'b', 1)
 * // => true
 */
function startsWith(value: string, target: string, position?: number): boolean {
    const { length } = value;
    position = position == null ? 0 : position;
    if (position < 0) {
        position = 0;
    } else if (position > length) {
        position = length;
    }
    target = `${target}`;
    return value.slice(position, position + target.length) === target;
}

export default startsWith;
