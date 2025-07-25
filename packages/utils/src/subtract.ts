import createMathOperation from './_internal/createMathOperation';

/**
 * Subtract two numbers.
 *
 * @since 0.4.11
 * @category Math
 * @param {number} minuend The first number in a subtraction.
 * @param {number} subtrahend The second number in a subtraction.
 * @returns {number} Returns the difference.
 * @example
 *
 * subtract(6, 4)
 * // => 2
 */
const subtract = createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0);

export default subtract;
