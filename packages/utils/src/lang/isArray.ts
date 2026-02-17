import getTag from './_internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(document.body.children);
 * // => false
 *
 * isArray('abc');
 * // => false
 *
 */
function isArray(value: any): boolean {
    return isObjectLike(value) && getTag(value) === '[object Array]';
}

export default isArray;
