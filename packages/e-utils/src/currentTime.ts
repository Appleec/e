/**
 * @author appleex
 * @date 2024-09-05 23:08
 */
import parseTime from "./formatTime";

/**
 * Get current time
 *
 * @since 0.2.0
 * @category Time
 * @param {string} format The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * currentTime();
 * // => 2022-04-18 13:53:24
 *
 * currentTime('YYYY-MM-DD');
 * // => 2022-04-18
 *
 */
function currentTime(format?: string): string {
    const date = new Date();
    return format ? parseTime(date, format) : parseTime(date, 'YYYY-MM-DD hh:mm:ss');
}

export default currentTime;
