import toString from './toString';

/**
 * Converts `string`, as a whole, to upper case just like
 * [String#toUpperCase](https://mdn.io/toUpperCase).
 *
 * @since 0.1.2
 * @category String
 * @param {string} [value=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * toUpper('--foo-bar--')
 * // => '--FOO-BAR--'
 *
 * toUpper('fooBar')
 * // => 'FOOBAR'
 *
 * toUpper('__foo_bar__')
 * // => '__FOO_BAR__'
 */
function toUpper(value: string = ''): string {
    return toString(value).toUpperCase();
}

export default toUpper;
