import toString from './toString';

/**
 * Add comma separator.
 *
 * @since 0.2.0
 * @category Util
 * @param {number|string} value The value to check.
 * @returns {string} Returns the string.
 * @example
 *
 * addCommas(20000)
 * // => 20,000
 *
 * addCommas('20000')
 * // => 20,000
 *
 * addCommas('20000%')
 * // => 20,000%
 *
 * addCommas(20000.0015)
 * // => 20,000.0015
 *
 */
function addCommas(value: number | string): string {
    let valStr = toString(value);
    // /(\d+(?:\.\d+)?)(\D+)/
    const match = valStr.match(/(-?\d+(?:\.\d+)?)(\D+)?/);
    if (match) valStr = match[1];

    const aIntNum = valStr.split('.');

    aIntNum[0] = aIntNum[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    // if (aIntNum[0].length >= 5) {}
    if (aIntNum[1] && aIntNum[1].length >= 5)
      aIntNum[1] = aIntNum[1].replace(/(\d{3})/g, '$1 ');

    return aIntNum.join('.') + (match && match[2] || '');
}

export default addCommas;
