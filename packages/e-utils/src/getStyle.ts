/**
 *  Create by appleex on 2022/4/22 3:53 下午.
 */
import camelCase from "./camelCase";

// var ieVersion = document.documentMode ? Number(document.documentMode) : 0;
const ieVersion = (typeof document !== 'undefined' && (document as any).documentMode) ? Number((document as any).documentMode) : 0;

/**
 * Get DOM element style
 *
 * @summary getStyle
 * @name getStyle
 * @since 2.0.0
 * @category Dom
 *
 * @param {HTMLDocument} el HTMLDocument
 * @param {string} styleName Name
 * @param {string} value Value
 *
 * @returns {string|number|null} Returns style value of DOM
 *
 * @example
 *
 * // <div id="wrapper" style="color: red; font-size: 14px;"></div>
 * const el = document.querySelector('div')
 *
 * getStyle(el, 'color')
 * // => 'red'
 *
 * // Support `font-size`
 * getStyle(el, 'fontSize')
 * // => '14px'
 */
const getStyle = ieVersion < 9 ? function(el, styleName) {
    if (!el || !styleName) return null;

    styleName = camelCase(styleName);
    if (styleName === 'float') styleName = 'styleFloat';

    try {
        switch (styleName) {
            case 'opacity':
                try {
                    return el.filter.item('alpha').opacity / 100;
                } catch (e) {
                    return 1.0;
                }
            default:
                return (el.style[styleName] || el.currentStyle ? el.currentStyle[styleName] : null)
        }
    } catch (e) {
        return el.style[styleName];
    }
} : function(el, styleName) {
    if (!el || !styleName) return null;
    styleName = camelCase(styleName);

    if (styleName === 'float') styleName = 'cssFloat';

    try {
        const computed = document.defaultView!.getComputedStyle(el, '');
        return el.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return el.style[styleName];
    }
};

/* Tests */
// import { JSDOM } from "jsdom";
// const dom = new JSDOM(`
//     <div id="wrapper" style="color: red; font-size: 14px;"></div>
// `);
//
// const el = dom.window.document.querySelector('div');
//
// console.log('=>', el.outerHTML);
// console.log('=>', getStyle(el, 'color'))
// console.log('=>', getStyle(el, 'fontSize'), getStyle(el, 'font-size'));

export default getStyle;
