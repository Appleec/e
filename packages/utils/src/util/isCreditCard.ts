/**
 * 检验是否是合法的身份证号
 *
 * @description
 * 【根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位* 数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一* 位数字校验码。
 *
 * 1、地址码：表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
 * 2、出生日期码：表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
 * 3、顺序码：表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
 * 4、校验码：是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。
 *
 * 15位校验规则 6位地址编码+6位出生日期(例：1991-3-23 => 910323)+3位顺序号
 * 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 *
 * 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
 *                公式(1)中：
 *                i----表示号码字符从由至左包括校验码在内的位置序号；
 *                ai----表示第i位置上的号码字符值；
 *                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 *                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 *                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 *
 * @since 0.3.0
 * @category Util
 * @param {string} str - 字符串
 * @returns {boolean} - 返回布尔类型
 * @example
 *
 * isCreditCard('352225199503011073');
 * // => true
 *
 */
function isCreditCard(str) {
    const provinces =
        '11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91';
    const codeLen = str.length;
    //长度校验
    if (codeLen !== 18 && codeLen !== 15) {
        return false;
    }
    //地址码校验
    if (provinces.indexOf(str.substring(0, 2)) === -1) {
        return false;
    }
    //出生日期码校验
    const birthCode =
        codeLen === 18 ? str.substring(6, 14) : '19' + str.substring(6, 12);
    const year = birthCode.substring(0, 4) - 0;
    const month = birthCode.substring(4, 6) - 1; //因为js中的月份从0开始
    const day = birthCode.substring(6, 8) - 0;
    const brithday = new Date(year, month, day);
    if (
        brithday.getFullYear() !== year ||
        brithday.getMonth() !== month ||
        brithday.getDate() !== day
    ) {
        return false;
    }
    //校验码校验
    if (codeLen === 18) {
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; //校验位
        const code = str.substring(17);
        //∑(ai×Wi)(mod 11)
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += str[i] * factor[i];
        }

        if (parity[sum % 11] === code.toUpperCase()) {
            return true;
        }
        return false;
    }
    return true;
}

/* Tests */

// console.log('=>', isCreditCard('352225199503011073'));

export default isCreditCard;
