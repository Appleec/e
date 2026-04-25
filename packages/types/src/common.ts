/**
 *
 * lib.es5.d.ts
 * Record,Pick,Partial,
 */

/**
 * Nullable
 */
export type ENullable<T> = T | null | undefined;

/**
 * NonNullable
 */
export type ENonNullable<T> = T extends null | undefined ? never : T;

/**
 * Arrayable
 */
export type EArrayable<T> = T | Array<T>;

/**
 * Object
 */
export type EObjable<T = any> = Record<string, T>;

/**
 * Function
 */
export type EFn<T = void> = () => T;

/**
 * Any Function
 */
export type EAnyFn = (...args: any[]) => any;

/**
 *  Range
 */
export type EventValue<T> = T | null
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null

/**
 * DOM
 */
export type TargetContext = '_self' | '_blank'
