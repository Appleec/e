// Imports

// Utils
import * as colors from './utils/colors'; // colors
import * as backgrounds from './utils/backgrounds'; // backgrounds
import * as symbols from './utils/symbols'; // symbols
import { paint } from './utils/paint';

// Abort
export type EAssignerType = 'help'
  | 'done'
  | 'valid'
  | 'minus'
  | 'plus'
  | 'spawn'
  | 'info'
  | 'warn'
  | 'error'
  | 'success'
  | 'unknown';

// Type
export type EAssignerOptions = {
  name?: string
  env?: 'node' | 'browser'
  type?: EAssignerType // Unknown
  symbol?: string
  tag?: string
  variant?: 'default' | 'text' | 'chip' | 'tonal' | 'outlined'
  timeEnabled?: boolean
  symbolEnabled?: boolean
  paintEnabled?: boolean
  prepend?: string
  append?: string
  color?: string
  background?: string
  customizer?: () => void
}

/**
 * createAssigner
 *
 * @param {EAssignerOptions} options
 * @example
 *
 * const L = createAssigner()
 * L('abc', 'de')
 * // => 'abc de'
 */

function createAssigner(
  options?: EAssignerOptions,
) {
  // options = typeof options === 'object' ? options : {}

  function assigner(message?: string, ...args: any[]) {
    options = typeof options === 'object' ? options : {};

    const typed = options.type || options.tag || options.symbol || 'unknown';

    // Prepend
    // timestamp symbol and label
    const prepend = options.prepend
      ? [options.prepend]
      : [
        ...(options.timeEnabled ? [colors.time('[' + new Date().toTimeString().split(' ')[0] + ']')] : []),
      ].concat([
        ...(options.symbolEnabled
            ? options.symbol ? [options.symbol] : (symbols[typed] ? [symbols[typed]] : [])
            : []),
        ...(options.tag ? [options.tag.toUpperCase()] : []),
      ].map(v => (
        options
        && options.variant
        && options.variant === 'chip'
        && backgrounds[typed]
          ? backgrounds[typed](' ' + v + ' ')
          : colors[typed] ? colors[typed](v) : v
      )));

    // Content
    const content = [message, ...args]
      .map(v => {
        if (
          options && options.paintEnabled
        )
          v = paint(v);

        if (
          options &&
          options.variant &&
          (options.variant === 'chip' || options.variant === 'text') &&
          colors[typed]
        )
          v = colors[typed](v);

        return v;
      });

    // Append
    const append = options.append ? [options.append] : [];

    // Combine all container
    const combine = [
      ...prepend,
      ...content,
      ...append,
    ];

    console.log(...combine);

    return assigner;
  }

  return assigner;
}

export { createAssigner };
export default createAssigner;
