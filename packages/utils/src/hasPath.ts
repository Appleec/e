import castPath from './_internal/castPath';
import isArguments from './isArguments';
import isIndex from './_internal/isIndex';
import isLength from './isLength';
import toKey from './_internal/toKey';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 0.4.12
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath(object, 'a.b')
 * // => true
 *
 * hasPath(object, ['a', 'b'])
 * // => true
 */
function hasPath(object, path) {
    path = castPath(path, object);

    let index = -1;
    let { length } = path;
    let result = false;
    let key;

    while (++index < length) {
        key = toKey(path[index]);
        result = object != null && hasOwnProperty.call(object, key);
        if (!result) {
            break;
        }
        object = object[key];
    }
    if (result || ++index !== length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return (
        !!length &&
        isLength(length) &&
        isIndex(key, length) &&
        (Array.isArray(object) || isArguments(object))
    );
}

export default hasPath;
