import createRound from './_internal/createRound';

/**
 * Computes `number` rounded down to `precision`.
 *
 * @since 0.4.11
 * @category Math
 * @param {number} number The number to round down.
 * @param {number} [precision=0] The precision to round down to.
 * @returns {number} Returns the rounded down number.
 * @example
 *
 * floor(4.006)
 * // => 4
 *
 * floor(0.046, 2)
 * // => 0.04
 *
 * floor(4060, -2)
 * // => 4000
 */
const floor = createRound('floor');

export default floor;
