import createMathOperation from './_internal/createMathOperation';

/**
 * Adds two numbers.
 *
 * @since 0.4.11
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4)
 * // => 10
 *
 * add(-1, 4)
 * // => 3
 */
const add = createMathOperation((augend, addend) => augend + addend, 0);

export default add;
