/**
 * Checks if `value` is greater than `other`.
 *
 * @since 0.4.12
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see gte, lt, lte
 * @example
 *
 * gt(3, 1)
 * // => true
 *
 * gt(3, 3)
 * // => false
 *
 * gt(1, 3)
 * // => false
 */
function gt(value, other) {
    if (!(typeof value === 'string' && typeof other === 'string')) {
        value = +value;
        other = +other;
    }
    return value > other;
}

// console.log('=>', 300.charCodeAt(0))
// console.log('=>', 'a'.charCodeAt(0))
// console.log('=>', gt(300, [2, 1]))
// console.log('=>', gt('ab', 'a'))

export default gt;
