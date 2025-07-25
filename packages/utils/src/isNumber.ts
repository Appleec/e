import getTag from './_internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `Number.isFinite` method.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @see isInteger, toInteger, toNumber
 * @example
 *
 * isNumber(3)
 * // => true
 *
 * isNumber(Number.MIN_VALUE)
 * // => true
 *
 * isNumber(Infinity)
 * // => true
 *
 * isNumber('3')
 * // => false
 */
function isNumber(value: any): boolean {
    return (
        typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]')
    );
}

// console.log('=>', isNumber(Infinity));
// console.log('=>', isNumber(NaN));
// console.log('=>', isNumber(null));

export default isNumber;
