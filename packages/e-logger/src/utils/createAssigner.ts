import c from 'ansis';
import { processLog } from './processLog';
import * as symbols from './symbols';

// abort
export type EAssignerType = 'help'
  | 'minus'
  | 'plus'
  | 'spawn'
  | 'info'
  | 'warn'
  | 'error'
  | 'success';

// type
export type EAssignerOptions = {
  [key: string]: any;
  env?: 'node' | 'browser';
  type?: EAssignerType; // Unknown
  symbol?: string; // *
  icon?: string; // *
  text?: string;
  color?: string;
  background?: string;
  prepend?: string;
  append?: string;
  fit?: boolean;
  chip?: boolean;
  verbose?: boolean;
  timestamp?: boolean;
  assigner?: 'all' | 'prev' | 'next'; // prev => 'prefix', next => 'after prefix', all => 'prev and next'
}

/**
 * createAssigner
 *
 * @param {Object|Function} assigner
 * @param {EAssignerOptions} options
 * @example
 *
 * const L = createAssigner()
 * L('abc', 'de')
 * // => 'abc de'
 *
 * L({}, 'abc', 'de')
 * // => 'abc de'
 */
export function createAssigner(
  assigner?,
  options?: EAssignerOptions
) {
  return function (strings?, ...slots) {
    const opts = Object.assign({}, options);

    if (typeof assigner === 'object')
      Object.assign(opts, assigner);

    if (typeof strings === 'object') {
      Object.assign(opts, strings);
      strings = '';
    }

    // Prepend icon and text
    const prependSlots = opts?.prepend || [
      opts.timestamp && c.gray(new Date().toTimeString().split(' ')?.[0]),
      opts.icon || opts.symbol || (opts.type && symbols?.[opts.type]) || '',
      opts.text || '',
    ].filter(Boolean).join(' ');

    // Append something in the future
    const appendSlots = opts?.append || '';

    // Custom assigner
    // Add `assigner` parameter to custom, such as `prev` and `next` in the future
    const customizer = typeof assigner === 'function'
      ? assigner({ ...opts }, processLog(strings, slots))
      : undefined;

    // Combine all container
    const container = customizer ? customizer : [
      setStyle({ ...opts }, prependSlots),
      processLog(strings, slots),
      appendSlots,
    ]
      .filter(Boolean)
      .join(' ');

    // Deal `fit` parameter
    const message = opts.fit
      ? setStyle({ ...opts, chip: false }, container)
      : container

    // Whether print `console` verbose
    if (opts.verbose || true)
      console.log(message);

    return message;
  };
}

export function pad(value) {
  return String(value).padStart(2, '0');
}

// Get timestamp string
export function geTimestamp(opts) {
  return new Date().toTimeString().split(' ')?.[0];
}

// Set styles from c, such as `cyan,red,green,yellow`
export function setStyle(opts, slots) {
  if (!(opts.color || opts.background))
    return slots;

  const color = opts.color;
  let background = opts.background;
  let fn = c;

  if (color) {
    fn = fn[color];

    if (opts.chip) {
      background = 'bg' + color[0].toUpperCase() + color.slice(1);
      fn = fn['white'];
    }
  }

  if (background) {
    fn = fn[background];
    slots = ' ' + slots + ' ';
  }

  return fn(slots);
}
