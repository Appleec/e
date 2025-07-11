import baseGet from './_internal/baseGet.js';

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 0.4.5
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get(object, path, defaultValue?) {
    const result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}

// const object = { 'a': [{ 'b': { 'c': 3 } }] }
//
// console.log('=>', get(object, ['a', 0, 'b', 'c']));

export default get;
