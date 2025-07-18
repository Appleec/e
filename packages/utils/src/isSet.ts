import getTag from './_internal/getTag.js';
import nodeTypes from './_internal/nodeTypes.js';
import isObjectLike from './isObjectLike.js';

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @since 0.4.7
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
const isSet = nodeIsSet
    ? (value) => nodeIsSet(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object Set]';

export default isSet;
