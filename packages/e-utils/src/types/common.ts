/**
 * @author appleex
 * @date 2024-01-09 11:28
 */

// 可空类型
export type Nullable<T> = T | null | undefined;
export type EmptyData = null | undefined;
export type Recordable<T = any> = Record<string, T>;

/**
 *  数组
 */
export type Arrayable<T> = T | Array<T>;
export type ArrayData = string[] | number[] | boolean[];

/**
 *  函数
 */
export type Fn<T = void> = () => T;
export interface IFn<T = any, R = T> {
    (...arg: T[]): R
}
export type AnyFn = (...args: any[]) => any;


/**
 *  范围区间
 */
export type EventValue<T> = T | null;
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null;

/**
 * DOM
 */
export type TargetContext = '_self' | '_blank';
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
