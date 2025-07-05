import getTag from './_internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _.isDate(new Date)
 * // => true
 *
 * _.isDate('Mon April 23 2012')
 * // => false
 */
function isDate(value: any): boolean {
    return isObjectLike(value) && getTag(value) === '[object Date]' && value !== 'Invalid Date';
}

export default isDate;
