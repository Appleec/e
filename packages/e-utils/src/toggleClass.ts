/**
 * @author appleex
 * @date 2024-09-10 07:41
 */

/**
 * Toggle class for the selected element
 *
 * @summary toggleClass
 * @name toggleClass
 * @since 0.2.0
 * @category Dom
 *
 * @param {HTMLElement} ele The value to process.
 * @param {string} className The value to process.
 *
 * @example
 *
 * // <div class="wrapper"></div>
 * const el = document.querySelector('div');
 *
 * // 'wrapper' -> ''
 * toggleClass(el, 'wrapper');
 * // => ''
 *
 * // '' -> 'wrapper'
 * toggleClass(el, 'wrapper');
 * // => 'wrapper'
 *
 */
function toggleClass(ele: HTMLElement, className: string): void {
    if (!ele || !className) {
        return;
    }
    let classString = ele.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
    }
    ele.className = classString;
}

/*
    Tests
 */
// import { JSDOM } from "jsdom";
// const dom = new JSDOM(`<div class="wrapper"></div>`);
// const el = dom.window.document.querySelector('div');
//
// // `wrapper`
// console.log('=>', el.outerHTML);
//
// // `wrapper` => ``
// setTimeout(() => {
//     toggleClass(el, 'wrapper');
//     console.log('=>', el.outerHTML);
// }, 5000)
//
// // `` => `wrapper`
// setTimeout(() => {
//     toggleClass(el, 'wrapper');
//     console.log('=>', el.outerHTML);
// }, 10000)


export default toggleClass;
