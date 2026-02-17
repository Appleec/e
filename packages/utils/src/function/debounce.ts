/**
 * 防抖函数
 *
 * @since 0.3.0
 * @category Util
 *
 * @param {Function} fn - 延迟执行函数
 * @param {Number} wait - 延迟时间间隔
 * @param {Boolean} immediate - 第一次调用是否立即执行
 *
 * @example
 *
 * // 延迟函数
 * function noop() {
 *     console.log('=>', 1);
 * }
 *
 * let fn1 = debounce(noop, 200);
 * fn1();
 * // => 200ms 后执行 noop() 函数
 *
 * let fn2 = debounce(noop, 200, true);
 * fn2();
 * // => 第一次调用立即执行 noop() 函数
 *
 */
function debounce(fn, wait, immediate) {
    let timer;

    return function() {
        const context = this;
        const args = arguments;

        if (!timer && immediate) {
            timer = -1;
            return fn.apply(context, args);
        }

        if (timer) clearTimeout(timer);

        timer = setTimeout(function() {
            fn.apply(context, args);
        }, wait);
    };
}

/* Backup */
// function debounce(fn, delay) {
//     let timeoutId = 0;
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => fn(...args), delay);
//     };
// }

/* Tests */
// function noop() {
//     console.log('=>', 1)
// }
//
// let fn = debounce(noop, 200);
// fn();

export default debounce;
