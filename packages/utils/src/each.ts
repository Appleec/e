import arrayEach from './_internal/arrayEach';
import baseEach from './_internal/baseEach';

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `forIn`
 * or `forOwn` for object iteration.
 *
 * @since 0.4.12
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see forEachRight, forIn, forInRight, forOwn, forOwnRight
 * @example
 *
 * each([1, 2], value => console.log(value))
 * // => Logs `1` then `2`.
 *
 * each({ 'a': 1, 'b': 2 }, (value, key) => console.log(key))
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function each(collection, iteratee) {
    const func = Array.isArray(collection) ? arrayEach : baseEach;
    return func(collection, iteratee);
}

// console.time('each');
// each([1, 2], v => console.log(v));
// console.timeEnd('each');

export default each;
