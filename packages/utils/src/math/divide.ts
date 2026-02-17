import createMathOperation from './_internal/createMathOperation';

/**
 * Divide two numbers.
 *
 * @since 0.4.11
 * @category Math
 * @param {number} dividend The first number in a division.
 * @param {number} divisor The second number in a division.
 * @returns {number} Returns the quotient.
 * @example
 *
 * divide(6, 4)
 * // => 1.5
 */
const divide = createMathOperation((dividend, divisor) => dividend / divisor, 1);

export default divide;
