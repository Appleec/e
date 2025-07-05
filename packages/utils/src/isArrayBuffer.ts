import getTag from './_internal/getTag.js';
import isObjectLike from './isObjectLike.js';
import nodeTypes from './_internal/nodeTypes.js';

/* Node.js helper references. */
const nodeIsArrayBuffer = nodeTypes && nodeTypes.isArrayBuffer;

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @since 0.4.7
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * isArrayBuffer(new Array(2))
 * // => false
 */
const isArrayBuffer = nodeIsArrayBuffer
    ? (value) => nodeIsArrayBuffer(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object ArrayBuffer]';

export default isArrayBuffer;
