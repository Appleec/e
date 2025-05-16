// @ts-nocheck
import castSlice from './_internal/castSlice.js';
import charsStartIndex from './_internal/charsStartIndex.js';
import stringToArray from './_internal/stringToArray.js';

const methodName = ''.trimLeft ? 'trimLeft' : 'trimStart';

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 0.4.7
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 */
function trimStart(string, chars) {
    if (string && chars === undefined) {
        return string[methodName]();
    }
    if (!string || !chars) {
        return string || '';
    }
    const strSymbols = stringToArray(string);
    const start = charsStartIndex(strSymbols, stringToArray(chars));
    return castSlice(strSymbols, start).join('');
}

export default trimStart;
