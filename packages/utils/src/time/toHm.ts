/**
 * @author appleex
 * @date 2024-09-06 13:27
 */
import isString from '../lang/isString';
import isNumber from '../lang/isNumber';
import isDate from '../lang/isDate';
import toDate from './toDate';

/**
 * Turn hours into minutes into numbers.
 *
 * @summary formatTimeToHM
 * @static
 * @since 0.2.0
 * @category Time
 * @param {Date} date The value to process.
 * @param {number} earlier The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * formatTimeToHm(new Date());
 * // => 2030
 *
 */
function toHm<T extends Date>(date: T, earlier: number): number {
    if (isString(date)) {
        try {
            date = toDate(date);
        } catch (e) {
            return 0;
        }
    }
    if (isDate(date)) {
        if (!earlier || !isNumber(earlier)) {
            earlier = 0;
        }
        return date.getHours() * 100 + (date.getMinutes() - earlier);
    }
    return 0;
}

export default toHm;
