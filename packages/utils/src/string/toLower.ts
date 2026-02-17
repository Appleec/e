import toString from './toString';

/**
 * Converts `string`, as a whole, to lower case just like
 * [String#toLowerCase](https://mdn.io/toLowerCase).
 *
 * @since 0.1.2
 * @category String
 * @param {string} [value=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * toLower('--Foo-Bar--')
 * // => '--foo-bar--'
 *
 * toLower('fooBar')
 * // => 'foobar'
 *
 * toLower('__FOO_BAR__')
 * // => '__foo_bar__'
 */
function toLower(value: string = ''): string {
    return toString(value).toLowerCase();
}

export default toLower;
