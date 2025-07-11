import getTag from './_internal/getTag.js';
import nodeTypes from './_internal/nodeTypes.js';
import isObjectLike from './isObjectLike.js';

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;

/* Node.js helper references. */
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @since 0.4.7
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 */
const isTypedArray = nodeIsTypedArray
    ? (value) => nodeIsTypedArray(value)
    : (value) => isObjectLike(value) && reTypedTag.test(getTag(value));

export default isTypedArray;
