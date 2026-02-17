/**
 * 节流函数
 *
 * @since 0.3.0
 * @category Util
 * @description
 * 节流函数可分为：首节流（时间戳）、尾节流（定时器）、首位兼容（时间戳&定时器）
 * 当前只支持首节流函数，下一步计划通过参数可配置兼容所有情况
 *
 * @param {Function} fn 延迟执行函数
 * @param {Number} wait 延迟函数执行时间间隔
 * @param {Boolean} immediate 第一次调用是否立即执行
 * @returns {Function}
 *
 * @example
 *
 *
 */
function throttle(fn, wait, immediate) {
    let lastTime = 0;
    return function () {
        const timestamp = Date.now();

        if (!lastTime && !immediate) {
            lastTime = timestamp;
        }

        if (timestamp - lastTime >= wait) {
            lastTime = timestamp;
            return fn.apply(this, arguments);
        }
    };
}

/* Tests */
// function noop() {
//     console.log('=>', 1);
// }
//
// let fn1 = throttle(noop, 5000, false);
// fn1();

// setTimeout(function () {
//     fn1();
// }, 12000)

export default throttle;
