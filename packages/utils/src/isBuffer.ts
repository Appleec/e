import root from './_internal/root';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = root?.Buffer?.isBuffer;

/**
 * Checks if `value` is a buffer.
 *
 * @since 0.1.3
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(Buffer.alloc(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
const isBuffer = typeof nativeIsBuffer === 'function' ? nativeIsBuffer : () => false;

export default isBuffer;
