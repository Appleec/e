import symbolTables from './_internal/bytes';

/* Tables */
const referenceTables = symbolTables

/* Default options */
const defaultOptions = {
  type: 'si',
  binary: 10,
  plainObject: false,
  space: true,
  precision: 1,
  locale: 'en-US',
}

/**
 * Byte size conversion
 *
 * https://github.com/pantajoe/bytes/blob/main/src/index.ts
 * https://github.com/75lb/byte-size/blob/master/index.js
 * https://github.com/avoidwork/filesize.js/blob/master/src/filesize.js
 *
 *
 *  SI NAME   | SYMB | DEC   | BIN  | IEC NAME | SYMB  | BIN
 *  ----------+------+-------+------+----------+-------+-----
 *  kilobyte  | (kB) | 10^3  | 2^10 | kibibyte | (KiB) | 2^10
 *  megabyte  | (MB) | 10^6  | 2^20 | mebibyte | (MiB) | 2^20
 *  gigabyte  | (GB) | 10^9  | 2^30 | gibibyte | (GiB) | 2^30
 *  terabyte  | (TB) | 10^12 | 2^40 | tebibyte | (TiB) | 2^40
 *  petabyte  | (PB) | 10^15 | 2^50 | pebibyte | (PiB) | 2^50
 *  exabyte   | (EB) | 10^18 | 2^60 | exbibyte | (EiB) | 2^60
 *  zettabyte | (ZB) | 10^21 | 2^70 | zebibyte | (ZiB) | 2^70
 *  yottabyte | (YB) | 10^24 | 2^80 | yobibyte | (YiB) | 2^80
 *
 *
 * @since 0.4.11
 * @category Util
 * @param {number} bytes The value to process.
 * @param {*} [options = {}] The value to process.
 * @returns {object|string} Returns the string or object.
 *  - value - byte value
 *  - unit - byte unit
 *  - long - byte long
 * @example
 *
 * byteSize(1200)
 * // => 1.20 kB
 *
 * byteSize(1200, { type: 'iec' })
 * // => 1.17 KiB
 *
 * byteSize.toPlainObject(1200)
 * // => { type: 'si', value: '1.20', unit: 'kB', long: 'kilobytes' }
 *
 * byteSize.toPlainObject(1200, { type: 'iec' })
 * // => { type: 'iec', value: '1.17', unit: 'KiB', long: 'kibibytes' }
 *
 */
function byteSize(bytes, options?) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes))
    throw new TypeError(
      `Bytesize is not a number. bytes=${Number.isNaN(bytes) ? 'NaN' : JSON.stringify(bytes)}`,
    )

  options = Object.assign({}, defaultOptions, options)

  if (options?.customTypes) Object.assign(referenceTables, options.customTypes)

  const base = options.binary === 2
    ? 1024
    : (options.binary === 10 ? 1000: options.binary)

  const { shorts = [], longs = [] } = referenceTables[options.type] || {}

  let loop = 0

  while (
    Math.abs(bytes) >= base
    && loop < shorts.length - 1
    ) {
    bytes /= base;
    ++loop;
  }

  if (options.precision) {
    bytes = Number(bytes).toFixed(options.precision);
  }

  if (options.plainObject) {
    return { type: options.type, value: `${bytes}`, unit: shorts?.[loop], long: longs?.[loop] }
  }

  return shorts && shorts[loop] ? `${bytes}${options.space ? ' ' : ''}${shorts[loop]}` : `${bytes}`;
}

byteSize.toTransValue = function (bytes, options?) {
  if (typeof bytes !== 'string' || bytes.length === 0)
    throw new TypeError(
      `Value is not a string or is empty. bytes=${JSON.stringify(bytes)}`,
    )

  if (bytes.length > 100)
    throw new TypeError(
      `Value exceeds the maximum length of 100 characters. bytes=${JSON.stringify(bytes)}`,
    )

  options = Object.assign({}, defaultOptions, options)

  const match =
    /^(?<value>-?(?:\d+(([.,])\d+)*)?[.,]?\d+) *(?<unit>bytes?|b|kb|kib|mb|mib|gb|gib|tb|tib|pb|pib|eb|eib|zb|zib|yb|yib|(kilo|kibi|mega|mebi|giga|gibi|tera|tebi|peta|pebi|exa|exbi|zetta|zebi|yotta|yobi)?bytes)?$/i.exec(
      bytes,
    )

  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const groups = match?.groups as { value: string; unit?: string } | undefined
  if (!groups) return Number.NaN

  const unit = (groups.unit || 'Bytes')
    .toUpperCase()
    .replace(/^KIBI/, 'KILO')
    .replace(/^MIBI/, 'MEGA')
    .replace(/^GIBI/, 'GIGA')
    .replace(/^TEBI/, 'TERA')
    .replace(/^PEBI/, 'PETA')
    .replace(/^EXBI/, 'EXA')
    .replace(/^ZEBI/, 'ZETTA')
    .replace(/^YIBI/, 'YOTTA')
    .replace(/^(.)IB$/, '$1B') as Uppercase<any> | 'B'

  const { shorts = [], longs = [] } = referenceTables[options.type] || {}

  const n = Number(groups.value)
  const level = shorts.findIndex(
    (u) => u[0].toUpperCase() === unit[0],
  )
  const base = options.binary === 2
    ? 1024
    : (options.binary === 10 ? 1000: options.binary)

  return n * base ** level
}

byteSize.toPlainObject = function(bytes, options?) {
  return byteSize(bytes, {
    ...options,
    plainObject: true,
  })
}

byteSize.defaultOptions = function (options) {
  Object.assign(defaultOptions, options)
}

// console.log('=>', toNumber('-199s'))
// console.time('byteSize')
// console.log('=>', byteSize(1200))
// console.log('=>', byteSize.toTransValue('1.2 KB', { binary: 10 }))
// console.log('=>', byteSize.toPlainObject(1200, { binary: 2 }))
// console.log('=>', byteSize.toPlainObject(1200, { type: 'iec' }))
// console.timeEnd('byteSize')


/**
 * Byte size conversion
 *
 * @since 0.2.0
 * @category Util
 * @param {number} bytes The value to process.
 * @param {boolean} [binary=false] The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * convertFileSizeToUnit(1000);
 * // => 1.0 kB
 *
 */
// function convertFileSizeToUnit(bytes, binary = false) {
//   const base = binary ? 1024 : 1000;
//
//   if (bytes < base) {
//     return `${bytes} B`;
//   }
//
//   const prefix = binary ? ['KiB', 'MiB', 'GiB'] : ['kB', 'MB', 'GB'];
//   let unit = 0;
//
//   while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
//     bytes /= base;
//     ++unit;
//   }
//
//   return `${bytes.toFixed(1)} ${prefix[unit]}`;
// }

// console.time('byteSize')
// console.log('=>', convertFileSizeToUnit(1200, true))
// console.timeEnd('byteSize')

export default byteSize;
