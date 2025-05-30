/**
 * 异步等待
 *
 * @summary Async wait
 * @since 0.3.0
 * @category Util
 *
 * @param {number} wait - 等待时间，毫秒（ms）
 * @param {Function} callback - 回调函数
 * @returns Awaitable promise for waiting X time.
 *
 * @example
 *
 * sleep(200);
 * // => 等待 200ms
 *
 * sleep(200).then(()=>{ // done});
 * // => 等待 200ms 后执行后续操作
 *
 * sleep(200, ()=>{}).then(()=>{ // done});
 * // => 等待 200ms 后，先执行自定义函数，然后执行后续操作
 */

function sleep(wait: number, callback?: () => any): Promise<void> {
    return new Promise(resolve => setTimeout(async() => {
        await callback?.();
        resolve();
    }, wait));
}

/* Tests */

// sleep(5000, () => {
//     console.log('=>callback')
// }).then(() => console.log('done'));

/* Backup */
// function sleep(wait: number): Promise<unknown> {
//     return new Promise(resolve => setTimeout(resolve, wait));
// }

export default sleep;
