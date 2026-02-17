import toNumber from './toNumber';
import isNil from './isNil';

/**
 * Unit conversion.
 *
 * @since 0.2.0
 * @category Util
 * @param {number|string} value The value to check.
 * @param {string} [unit=''] The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * convertToUnit();
 * // => undefined
 *
 * convertToUnit(16);
 * // => 16px
 *
 * convertToUnit('a');
 * // => a
 *
 * convertToUnit('16', 'g');
 * // => 16g
 */
function convertToUnit(value, unit = '') {
    if (isNil(value))
      return value;
    if (Number.isNaN(+value))
      return value.toString();

    return toNumber(value) + unit;
}

// console.log('=>', convertToUnit('12', 'px'))

// function convertToUnit(str, unit = 'px') {
//     if (str == null || str === '') {
//         return undefined;
//     } else if (isNaN(+str)) {
//         return String(str);
//     } else {
//         return `${Number(str)}${unit}`;
//     }
// }

export default convertToUnit;
