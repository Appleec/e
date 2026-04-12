import root from '../_internal/root';

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;

/** Detect free variable `module`. */
// const freeModule = freeExports &&  typeof module === 'object' && module !== null && !module.nodeType && module;
const freeModule = freeExports &&  typeof module === 'object' && module !== null && module;

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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
