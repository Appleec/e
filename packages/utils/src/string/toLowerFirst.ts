import createCaseFirst from './_internal/createCaseFirst';

/**
 * Converts the first character of `string` to lower case.
 *
 * @since 0.1.2
 * @category String
 * @param {string} [value=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toLowerFirst('Fred')
 * // => 'fred'
 *
 * toLowerFirst('FRED')
 * // => 'fRED'
 */
const toLowerFirst = createCaseFirst('toLowerCase');

export default toLowerFirst;
