const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `str` to their corresponding HTML entities.
 * For example, "<" becomes "&lt;".
 *
 * @since 0.1.3
 * @category String
 * @param value  The string to escape.
 * @returns Returns the escaped string.
 *
 * @example
 * escape('This is a <div> element.');
 * // => 'This is a &lt;div&gt; element.'
 * escape('This is a "quote"');
 * // => 'This is a &quot;quote&quot;'
 * escape("This is a 'quote'");
 * // => 'This is a &#39;quote&#39;'
 * escape('This is a & symbol');
 * // => 'This is a &amp; symbol'
 */
function escape(value: string): string {
  return value.replace(/[&<>"']/g, (match) => htmlEscapes[match])
}

export default escape
