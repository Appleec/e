/**
 *  Create by appleex on 2022/4/19 5:13 下午.
 */
import root from './_internal/root';

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on
 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
 *
 * @summary isFinite
 * @static
 * @since 0.2.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * isFinite(3);
 * // => true
 *
 * isFinite(Number.MIN_VALUE);
 * // => true
 *
 * isFinite(Infinity);
 * // => false
 *
 * isFinite('3');
 * // => false
 */
function isFinite(value) {
  return typeof value === 'number' && root.isFinite(value);
}

export default isFinite;
