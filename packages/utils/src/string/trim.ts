/**
 * @author appleex
 * @date 2024-08-25 17:20
 */
import castSlice from './_internal/castSlice';
import charsEndIndex from './_internal/charsEndIndex';
import charsStartIndex from './_internal/charsStartIndex';
import stringToArray from './_internal/stringToArray';

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @since 0.1.0
 * @category String
 * @param {string} [value=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trimEnd, trimStart
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
function trim(value: string, chars?: string): string {
    if (value && chars === undefined) {
        return value.trim();
    }
    if (!value || !chars) {
        return value || '';
    }
    const strSymbols = stringToArray(value);
    const chrSymbols = stringToArray(chars);
    const start = charsStartIndex(strSymbols, chrSymbols);
    const end = charsEndIndex(strSymbols, chrSymbols) + 1;

    return castSlice(strSymbols, start, end).join('');
}

export default trim;
