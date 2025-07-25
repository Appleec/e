import getTag from './_internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.3
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value: any): boolean {
    return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export default isArguments;
