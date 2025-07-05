/**
 * Symbols
 *
 * @see https://symbl.cc/cn/unicode/
 * @see https://coolsymbol.com/
 * @see https://teshuzifu.cn/
 * @see http://www.fuhaodaquan.org/
 * @see https://emojipedia.org/zh
 * @see https://fuhao.mykuaidi.com/
 */
import isUnicodeSupported from 'is-unicode-supported';

const _isUnicodeSupported = isUnicodeSupported();

// https://github.com/sindresorhus/log-symbols/blob/main/symbols.js
// Basic
export const info = _isUnicodeSupported ? 'i' : 'i'; // ℹ ⅰ i ℹ 𝓲
export const success = _isUnicodeSupported ? '✓' : '√'; // ✓ ✔ √
export const error = _isUnicodeSupported ? '✗' : '×'; // ⅹ ✕ ✘ x X ☓ ✗ 𝗫 ✖ ×
export const warn = _isUnicodeSupported ? '⚠' : '‼';
export const help = _isUnicodeSupported ? '?' : '?'; // ?

// Expand
export const spawn = _isUnicodeSupported ? '›' : '>'; // ❯ › » ❭ ❯ > ＞
export const plus = _isUnicodeSupported ? '+' : '+'; //
export const minus = _isUnicodeSupported ? '-' : '-'; //  —

export const done = _isUnicodeSupported ? '⏺' : '√';
export const valid = _isUnicodeSupported ? '○' : '-';
