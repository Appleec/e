/**
 * @author appleex
 * @date 2024-09-10 21:46
 */
import camelCase from './camelCase';

const IN_BROWSER = typeof window !== 'undefined';

const ieVersion = (IN_BROWSER && (document as any).documentMode) ? Number((document as any).documentMode) : 0;

/**
 * Styling DOM elements.
 *
 * @summary setStyle
 * @since 0.2.0
 * @category Dom
 *
 * @param {HTMLDocument} el HTMLDocument
 * @param {string} styleName Name
 * @param {string | number} value Value
 *
 * @example
 *
 * const el = window.document.createElement('div')
 *
 * setStyle()
 * // => undefined
 *
 * setStyle(el, 'color', 'red')
 * // => <div style="color: red;"></div>
 *
 * setStyle(el, { color: 'red', fontSize: '16px' })
 * // => <div style="color: red; font-size: 16px;"></div>
 */
function setStyle(
    el: HTMLElement,
    styleName: string | object,
    value?: string | number,
): void | undefined {
    if (!el || !styleName) return;

    if (typeof styleName === 'object') {
        for (const prop in styleName) {
            if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
                setStyle(el, prop, styleName[prop]);
            }
        }
    } else {
        // const ieVersion = (document as any).documentMode ? Number((document as any).documentMode) : 0;

        styleName = camelCase(styleName);
        if (styleName === 'opacity' && ieVersion < 9) {
            el.style.filter = Number.isNaN(value as number) ? '' : 'alpha(opacity=' + (value as number) * 100 + ')';
        } else {
            el.style[styleName] = value;
        }
    }
}

/* Tests */
// import { JSDOM } from "jsdom";
// const dom = new JSDOM();
//
// const el = dom.window.document.createElement('div');
// setStyle(el, 'color', 'red');
// console.log('=>', el.outerHTML);
// setStyle(el, { color: 'red', fontSize: '16px' });
//
// console.log('=>', el.outerHTML);
// console.log(setStyle());

export default setStyle;
