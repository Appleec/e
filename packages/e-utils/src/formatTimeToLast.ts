/**
 * @author appleex
 * @date 2024-09-06 13:27
 */

import formatTime from "./formatTime";

/**
 * Format to last time, like Semantic.
 *
 * @static
 * @since 0.2.0
 * @category Time
 * @param {Date} time Timestamp.
 * @param {*} option The value to process.
 * @returns {string} Returns the number.
 * @example
 *
 * formatTime(new Date());
 * // => 刚刚
 *
 * formatTime(new Date('2022-1-1'), 'YYYY'));
 * // => 2022
 *
 */
function formatTimeToLast(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - +d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return formatTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}

export default formatTimeToLast;
