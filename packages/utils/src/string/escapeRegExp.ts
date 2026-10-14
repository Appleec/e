/**
 * Escapes the RegExp special characters "^", "$", "\\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|" in `str`.
 *
 * @since 0.1.3
 * @category String
 * @param str The string to escape.
 * @returns Returns the escaped string.
 *
 * @example
 *
 * escapeRegExp('[utils](https://utils.dev/)');
 * // => '\[es-toolkit\]\(https://utils\.dev/\)'
 */
function escapeRegExp(str: string): string {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

export default escapeRegExp;
