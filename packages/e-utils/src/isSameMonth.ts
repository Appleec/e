/**
 * @author appleex
 * @date 2024-09-10 06:43
 */
import toDate from "./toDate";

/**
 * Checks the dates in the same month (and year).
 *
 * @see https://github.com/date-fns/date-fns/blob/main/src/isSameMonth/index.ts
 *
 * @name isSameMonth
 * @since 0.2.0
 * @category Time
 * @summary Are the given dates in the same month (and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * // => true
 *
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * // => false
 *
 */
function isSameMonth<DateType extends Date>(
    dateLeft: DateType | number | string,
    dateRight: DateType | number | string,
): boolean {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    return (
        _dateLeft.getFullYear() === _dateRight.getFullYear() &&
        _dateLeft.getMonth() === _dateRight.getMonth()
    );
}

export default isSameMonth;
