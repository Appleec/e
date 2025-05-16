/**
 * @author appleex
 * @date 2024-09-10 03:48
 */
import toDate from "./toDate";

// Types
interface IWeekOptions {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek<DateType extends Date>(
    date: DateType | number | string,
    options?: IWeekOptions,
): DateType {
    const weekStartsOn = options?.weekStartsOn ?? 0;

    const _date = toDate(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
}

/**
 * @name isSameWeek
 * @category Time
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek<DateType extends Date>(
    dateLeft: DateType | number | string,
    dateRight: DateType | number | string,
    options?: IWeekOptions,
): boolean {
    const dateLeftStartOfWeek = startOfWeek(dateLeft, options);
    const dateRightStartOfWeek = startOfWeek(dateRight, options);

    return +dateLeftStartOfWeek === +dateRightStartOfWeek;
}

// function isSameWeekOld(preDate, curDate) {
//     // if (!isDate(preDate) || !isDate(curDate)) {
//     //     return false;
//     // }
//     if (preDate - curDate > 0) {
//         [preDate, curDate] = [curDate, preDate];
//     }
//     let gap = (curDate - preDate) / 86400000;
//     return curDate.getDay() >= preDate.getDay() && gap < 7;
// }

// import formatTime from "./formatTime";
// console.log('=>', formatTime(startOfWeek(new Date(2014, 7, 31),  { weekStartsOn: 1 })));
// console.log('=>', formatTime(startOfWeek(new Date(2014, 8, 4), { weekStartsOn: 1 })));

// console.log('=>isSameWeek', isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4)))
// console.log('=>isSameWeekOld', isSameWeekOld(new Date(2014, 7, 31), new Date(2014, 8, 4)))

export default isSameWeek;
