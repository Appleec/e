import util from 'node:util'
import * as symbols from './symbols'

/** format args */
function format(args: any[], customPrefix?: string) {
  const fmt = customPrefix === undefined
      ? '%s'
      : '' + customPrefix

  return util
      .format(fmt, ...args)
      .split('\n')
      .join('')
}

/** log */
export function log(...args: any[]) {
  console.log(format(args))
}

/** success */
export function success(...args: any[]) {
  console.log(format(args, symbols.success))
}

/** error */
export function error(...args: any[]) {
  console.error(format(args, symbols.error))
}

/** warning */
export function warning(...args: any[]) {
  console.warn(format(args, symbols.warning))
}

/** info */
export function info(...args: any[]) {
  console.info(format(args, symbols.info))
}