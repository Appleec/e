/**
 * @author appleex
 * @date 2024-09-06 16:30
 */
import isDate from "./isDate";

/**
 * Convert date string to date
 * parseDate
 *
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {Date} Returns the Date.
 * @example
 *
 * toDate()
 * // => Date
 *
 * toDate(1392098430000)
 * // => 2014-02-11T06:00:30.000Z
 *
 * toDate('1392098430000')
 * // => 2014-02-11T06:00:30.000Z
 *
 */

// TODO: Next plan to support special timestamp, eg: 202201011200
function toDate<DateType extends Date>(value: DateType | number | string):  DateType {
    // if (!value) return value;

    // isDate
    if (isDate(value)) return value as DateType;

    // isNaN
    if (!isNaN(+value)) return new Date(+value) as DateType;

    value = value.toString().replace(/-/g, '/');

    return new Date(value) as DateType;
}

// console.log('=>', toDate('2022-01-01'))
// console.log('=>', toDate(1392098430000))
// console.log('=>', toDate('1392098430000'))

// if (format) {
//     const d = new Date();
//
//     const fmt = format
//         .match(/[yYQqMLwIdDecihHKkms]o|(\w)\1*/g)!
//         .map((m) => {
//             const firstChar = m[0];
//             const l = format.search(m);
//             console.log(m, firstChar, format.search(m));
//             if (firstChar === 'Y') d.setFullYear(value.toString().substring(l, l + m.length));
//             if (firstChar === 'M') {
//                 d.setMonth(+value.toString().substring(l, l + m.length) - 1);
//             }
//             if (firstChar === 'D') d.setDate(+value.toString().substring(l, l + m.length));
//             return m
//         })
// }

// function isTimestamp(value) {
//     return typeof value === 'number' && value > 0 && new Date(value).getTime() === value;
// }
// function isTimestamp(value) {
//     return typeof value === 'number' && /^\d{10}$|^\d{13}$/.test(value.toString());
// }

export default toDate;
