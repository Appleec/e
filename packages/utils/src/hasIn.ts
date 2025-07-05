/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 0.4.11
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see has, hasPath, hasPathIn
 * @example
 *
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 */
function hasIn(object, key) {
    return object != null && key in Object(object);
}

// console.log('=>', hasIn({a: 1, b: 2, c: 3}, 'd'));

export default hasIn;
