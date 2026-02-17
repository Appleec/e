import camelCase from './camelCase';
import upperFirst from './toUpperFirst';

/**
 * Formats the given string in pascal case fashion
 *
 * @since 0.3.0
 * @category String
 * @param {string} [value=''] - The value is string.
 * @returns { string} - Returns string type.
 * @example
 *
 * pascalCase('Foo Bar')
 * // => FooBar
 */
function pascalCase(value) {
    const str = camelCase(value);

    return upperFirst(str);
}

/* Tests */

// console.log('=>', pascalCase('Foo Bar'))
// console.log('=>', pascalCase('hello world'))
// console.log('=>', pascalCase(''))
// console.log('=>', pascalCase(9))
// console.log('=>', pascalCase(null))

/* Backup */
// const pascal = (str: string): string => {
//     const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
//     if (parts.length === 0) return ''
//     return parts.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join('')
// }
export default pascalCase;


