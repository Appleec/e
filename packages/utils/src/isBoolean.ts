import getTag from './_internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
function isBoolean(value: any): boolean {
    return (
        value === true ||
        value === false ||
        (isObjectLike(value) && getTag(value) === '[object Boolean]')
    );
}

export default isBoolean;
