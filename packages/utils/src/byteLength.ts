/* Default options*/
// const defaultOptions = {
//   encoding: 'utf-8',
// }

/*
  [] Unicode 将字符分为 17 个平面，第 1 个平面（称为基本多语言平面）到第 17 个平面（其他平面称为辅助平面）
  - 基本多文种平面（BMP）：从 U+0000 到 U+FFFF，包含大多数常用的字符。
  - 补充多文种平面（SMP）：从 U+10000 到 U+1FFFF，包含古代文字、音乐符号等。
  - 补充表意文字平面（SIP）：从 U+20000 到 U+2FFFF，主要用于中日韩表意文字。
  - 补充专用区（SSP）：从 U+E0000 到 U+EFFFF，用于私人使用的字符。

  [0x000000, 0x10ffff]   []
  [0x0000, 0xffff]       [0, 65535]               基本多语言平面，从 U+D800(10 进制：55296) 到 U+DFFF(57343) 之间的码位（共 2048 个码位）是永久保留不映射到 Unicode 字符

  [] utf-8
  [0x0000, 0x007f]      [0, 127]           1-byte 128 个 US-ASCII 字符只需一个字节编码（Unicode 范围由 U+0000 至 U+007F）
  [0x0080, 0x07ff]      [128, 2047]        2-byte 带有附加符号的拉丁文、希腊文、西里尔字母、亚美尼亚语、希伯来文、阿拉伯文、叙利亚文及它拿字母则需要两个字节编码（Unicode 范围由 U+0080 至 U+07FF）
  [0x0800, 0xffff]      [2048, 65535]      3-byte 其他基本多文种平面（BMP）中的字符（这包含了大部分常用字，如大部分的汉字）使用三个字节编码（Unicode 范围由 U+0800 至 U+FFFF）
  [0xd800, 0xdbff]      [55296, 56319]     ?-byte HighSurrogate
  [0xdc00, 0xdfff]      [56320, 57343]     ?-byte LowSurrogate
  [0x10000, 0x10FFFF]   [65536, 1114111]   4-byte 其他极少使用的 Unicode 辅助平面的码位使用四字节编码（Unicode 范围由 U+10000 至 U+10FFFF）

  [] utf-16
  [0x0000, 0xffff]      [0, 65535]         2-byte 对于基本多语言平面内（U+0000 到 U+FFFF，不包括前面提到的 U+D800 到 U+DFFF 之间的范围）的，因为一个平面就是 2^16 个字符，因此用 2 个字节就可以存储（在 UTF-16 中，2 个字节被称为一个 码元）
  [0x10000, 0x10FFFF]   [65536, 1114111]   4-byte 对于辅助平面（U+010000 到 U+10FFFF）的，使用 4 个字节来存储，相当于 2 个 码元，这称为 代理对。前面的码元称为 前导代理，后面的码元称为 后导代理

  [] utf-32 固定长度编码，使用 4 个字节表示一个字符
*/

/**
 * Calculate byte length
 *
 * https://github.com/hanfour/string-bytes-calculator/blob/main/src/stringBytes.js
 * https://github.com/ehmicky/string-byte-length/blob/main/src/main.js
 * https://github.com/Moodyqiqi/get-byte-length/blob/master/index.js
 * https://github.com/DylanPiercey/byte-length/blob/master/src/index.ts
 *
 * https://my.oschina.net/emacs_8520357/blog/16573542
 *
 * https://www.unicode.org/emoji/charts/full-emoji-list.html
 *
 * @since 0.2.0
 * @category Util
 * @param {string} value The value to check.
 * @param {*} options The value to check.
 * @returns {number} Returns the byte length of an utf8 string.
 * @example
 *
 * byteLength('abcd');
 * // => 4
 *
 * byteLength('😊');
 * // => 4
 *
 * byteLength('你是谁');
 * // => 9
 *
 */
function byteLength(value, options?) {
  if (!value || typeof value !== 'string') return 0;

  // options = Object.assign({}, defaultOptions, options)

  const vArray: string[] = Array.from(value);
  let vLength = 0;

  for (let i = 0; i < vArray.length; i++) {
    const code = vArray[i].codePointAt(0) as number;

    // utf-8
    if (code > 0x0000 && code <= 0x007f) {
      // 1-byte 0-127
      vLength += 1;
    } else if (code >= 0x0080 && code <= 0x07ff) {
      // 2-byte 128-2047
      vLength += 2;
    } else if (code >= 0x0800 && code <= 0xffff) {
      // 3-byte 2048-65535

      // ?-byte 55296-57343 Proxy area
      // if(code >= 0xd800 && code <= 0xdfff) {}
      vLength += 3;
    } else if (code >= 0x10000 && code <= 0x10ffff) {
      // 4-byte 65536-1114111
      vLength += 4;
    } else {
      // 4-byte --
      vLength += 4;
    }
  }

  return vLength;
}

// function byteLength(value) {
  // let s = value.length;
  // for (let i = value.length - 1; i >= 0; i--) {
  //   const code = value.charCodeAt(i);
  //   if (code > 0x7f && code <= 0x7ff) s++;
  //   else if (code > 0x7ff && code <= 0xffff) s += 2;
  //   if (code >= 0xDC00 && code <= 0xDFFF) i--;
  // }
  // return s;
// }


// console.time('byteLength')
// console.log('=>', new TextEncoder().encode('😊').length)
// console.log('=>', new Blob(['hello世界']).size)
// console.log('=>', '😊'.codePointAt(0))
// console.log('=>', byteLength('😊'))
// console.log('=>', byteLength('世界'))
// console.log('=>', byteLength('hello世界😊'));
// console.timeEnd('byteLength')


export default byteLength;
