import util from 'node:util'
import * as symbols from './symbols'

/**
 * format
 * @param args
 * @param customPrefix
 */
function format(args: any[], customPrefix?: string) {
    const fmt = customPrefix === undefined ? '%s' : '' + customPrefix

    return util
        .format(fmt, ...args)
        .split('\n')
        .join('')
}

/**
 * log for fastLog
 * @param args
 */
export function log(...args: any[]) {
    console.log(format(args))
}

/**
 * success for fastLog
 * @param args
 */
export function success(...args: any[]) {
    console.log(format(args, symbols.success?.symbol))
}

/**
 * error for fastLog
 * @param args
 */
export function error(...args: any[]) {
    console.error(format(args, symbols.error?.symbol))
}

/**
 * warn for fastLog
 * @param args
 */
export function warn(...args: any[]) {
    console.warn(format(args, symbols.warn?.symbol))
}

/**
 * info for fastLog
 * @param args
 */
export function info(...args: any[]) {
    console.info(format(args, symbols.info?.symbol))
}

/**
 * exec for fastLog
 * @param args
 */
export function exec(...args: any[]) {
    console.info(format(args, symbols.exec?.symbol))
}
