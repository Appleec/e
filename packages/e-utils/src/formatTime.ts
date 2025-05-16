/**
 * @author appleex
 * @date 2024-09-05 22:36
 */
import isObject from "./isObject";
import isString from "./isString";
import isNumber from "./isNumber";

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
// eg. date-fns
// const formattingTokensRegExp =
//     /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const formattingTokensRegExp =
    /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|./g;

// eg. moment
// const formattingRegExp =
//     /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
// const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

function cleanEscapedString(input: string): string {
    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const matched = input.match(escapedStringRegExp);

    if (!matched) {
        return input;
    }

    return matched[1].replace(doubleQuoteRegExp, "'");
}

/**
 * Format time，Upgrade from `parseTime()` method.
 *
 * See.
 * [date-fns](https://github.com/date-fns/date-fns/blob/main/src/format/index.ts)
 * [moment](https://github.com/moment/moment/blob/develop/src/lib/format/format.js)
 * [dayjs](https://github.com/iamkun/dayjs/blob/dev/src/index.js)
 *
 * @since 0.2.0
 * @category Time
 * @param {object|string|number} value - The value to process.
 * @param {string} format - The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * var d = new Date('2022-01-01 12:00:00');
 *
 * formatTime(d);
 * // => 2022-01-01 12:00:00
 *
 * formatTime(d, 'YYYY-MM-DD');
 * // => 2022-01-01
 *
 * formatTime(d, 'YYYYMMD');
 * // => 20220101
 *
 * formatTime(d, 'hh:mm:ss');
 * // => 12:00:00
 *
 * formatTime();
 * // => null
 *
 */
function formatTime<DateType extends Date>(value: DateType | string | number, format?: string): string {
    // if (arguments.length === 0) return null;

    const cFormat = format || 'YYYY-MM-DD hh:mm:ss';
    let date;

    if (isObject(value)) {
        date = value;
    } else {
        if (isString(value) && (/^[0-9]+$/.test(value as string))) value = parseInt(value as string);
        if (isNumber(value) && (value.toString().length === 10)) value = +value * 1000;
        date = new Date(value);
    }

    const oFormat = {
        Y: date.getFullYear(), // year
        M: date.getMonth() + 1, // month
        D: date.getDate(), // day
        h: date.getHours(), // hours
        m: date.getMinutes(), // minute
        s: date.getSeconds(), // second
        a: date.getDay(), // week
        q: Math.floor((date.getMonth() + 3) / 3), //
        S: date.getMilliseconds() // millisecond
    };

    return cFormat
        .match(formattingTokensRegExp)!
        .map((substring) => {
            // Replace two single quote characters with one single quote character
            if (substring === "''") {
                return { isToken: false, value: "'" };
            }

            const firstCharacter = substring[0];

            if (firstCharacter === "'") {
                return { isToken: false, value: cleanEscapedString(substring) };
            }

            if (Object.keys(oFormat).includes(firstCharacter)) {
                return { isToken: true, value: substring };
            }

            // if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            //     throw new RangeError(
            //         "Format string contains an unescaped latin alphabet character `" +
            //         firstCharacter +
            //         "`",
            //     );
            // }

            return { isToken: false, value: substring };
        })
        .map((part) => {
            if (!part.isToken) return part.value;

            const substring = part.value;
            const firstCharacter = substring[0];

            const value = oFormat[firstCharacter]

            // Note: getDay() returns 0 on Sunday
            if (firstCharacter === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }

            return value.toString().padStart(2, '0')
        })
        .join("");
}

// var d = new Date('2022-01-01 12:00:00');
//
// console.log('=>', formatTime(d))
// console.log('=>', formatTime(d, 'YYYY-MM-DD hh:mm:ss')); // => 2022-01-01 12:00:00
// console.log('=>', formatTime(d, "YYYY/MM/DD hh:mm:ss")); // => 2022/01/01 12:00:00
// console.log('=>', formatTime(d, "YYYYMMD")); // => 20220101

export default formatTime;
