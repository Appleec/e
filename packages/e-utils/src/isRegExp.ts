import getTag from './_internal/getTag.js';
import isObjectLike from './isObjectLike.js';
import nodeTypes from './_internal/nodeTypes.js';

/* Node.js helper references. */
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @since 0.4.7
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
const isRegExp = nodeIsRegExp
    ? (value) => nodeIsRegExp(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object RegExp]';

export default isRegExp;
