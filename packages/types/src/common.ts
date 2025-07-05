/**
 *
 * lib.es5.d.ts
 * Record,Pick,Partial,
 */

/**
 * Empty
 */
export type ENullable<T> = T | null | undefined
export type EEmptyData = null | undefined
export type ERecordable<T = any> = Record<string, T>

/**
 *  Array
 */
export type EArrayable<T> = T | Array<T>
export type EArrayData = string[] | number[] | boolean[];
export type EReadonlyArray<T> = ReadonlyArray<T>;

/**
 *  Function
 */
export type EFn<T = void> = () => T
export interface IFn<T = any, R = T> {
    (...arg: T[]): R
}
export type AnyFn = (...args: any[]) => any

/**
 *  Range
 */
export type EventValue<T> = T | null
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null

/**
 * DOM
 */
export type TargetContext = '_self' | '_blank'
