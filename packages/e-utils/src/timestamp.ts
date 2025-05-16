/**
 * @author appleex
 * @date 2024-09-02 21:13
 */

/**
 * Get timestamp.
 *
 * @since 0.2.0
 * @category time
 * @return {number} Returns the number.
 * @example
 *
 * timestamp();
 * // => 1725283260373
 */
function timestamp(): number {
    return +Date.now();
}

// console.log("=>(timestamp.ts:22) timestamp", timestamp());

export default timestamp;
