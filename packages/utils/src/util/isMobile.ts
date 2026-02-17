/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */

/**
 * Checks if navigator is mobile.
 *
 * @summary isMobile
 * @static
 * @since 0.2.0
 * @category Lang
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 *
 */
function isMobile() {
  return !!navigator.userAgent.match(/mobile/i);
}

export default isMobile;
