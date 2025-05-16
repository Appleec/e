/**
 * @author appleex
 * @date 2024-09-09 07:00
 */
import toDate from "./toDate";

/**
 * @name startOfDay
 * @since 0.2.0
 * @category Time
 * @summary Return the start of a day for the given date.
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 * @typeParam DateType
 * @param {Date | number | string} date - The original date.
 * @returns The start of a day
 * @example
 *
 * startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * // => Tue Sep 02 2014 00:00:00
 *
 */
function startOfDay<DateType extends Date>(
    date: DateType | number | string,
): DateType {
    const d = toDate(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Checks if `dateLeft` and `dateRight` is the same Day.
 *
 * @name isSameDay
 * @since 0.2.0
 * @category Time
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on.
 *
 * @param {DateType | number | string} dateLeft - The first date to check
 * @param {DateType | number | string} dateRight - The second date to check
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 *
 * isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * // => true
 *
 * isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * // => false
 *
 * isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * // => false
 *
 */
function isSameDay<DateType extends Date>(
    dateLeft: DateType | number | string,
    dateRight: DateType | number | string,
): boolean {
    const dateLeftStartOfDay = startOfDay(dateLeft);
    const dateRightStartOfDay = startOfDay(dateRight);

    return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// console.log('=>', isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0)))
// console.log('=>', isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4)))

export default isSameDay;
