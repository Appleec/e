/**
 *
 * lib.es5.d.ts
 * Record,Pick,Partial,
 */

/**
 * Empty
 */
export type Nullable<T> = T | null | undefined
export type EmptyData = null | undefined
export type Recordable<T = any> = Record<string, T>

/**
 *  Array
 */
export type Arrayable<T> = T | Array<T>
export type ArrayData = string[] | number[] | boolean[]

/**
 *  Function
 */
export type Fn<T = void> = () => T
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
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
