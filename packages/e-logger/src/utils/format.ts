import util from 'node:util';

export function format(args: any[], customPrefix?: string) {
  const fmt = customPrefix === undefined ? '%s' : '' + customPrefix

  return util
    .format(fmt, ...args)
    .split('\n')
    .join('')
}
