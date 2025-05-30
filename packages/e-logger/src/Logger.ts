import c from 'ansis';
import * as compact from './modules';
import { createAssigner } from './utils/createAssigner';

export type ELoggerOptions = {
  name?: string;
}

export class Logger {
  constructor(private readonly options?: ELoggerOptions) {
    this.options = Object.assign({
      name: '<e-logger>',
    }, options);
  }

  public time = compact.time
  public done = compact.done
  public valid = compact.valid
  public minus = compact.minus
  public plus = compact.plus
  public spawn = compact.spawn
  public help = compact.help
  public warn = compact.warn
  public error = compact.error
  public success = compact.success
  public info = compact.info
}

export function createPrev(options?) {
  const opts = Object.assign({
    type: 'info',
    template: '{{symbol}}',
    color: 'cyan',
    timestamp: false,
  }, options);

  if (!opts.template)
    return '';

  return opts.template!
    .replace(/{{([^{}]*)}}/g, (match, prop) => {
      if (prop === 'time') {
        const timeString = new Date().toTimeString().split(' ')?.[0];
        return c.gray(timeString);
      }
      if (prop === 'symbol') {}
      if (prop === 'label') {}

      return match;
    })
}

export function createLogger(options?) {
  if (typeof options === 'string') {
    options = { name: options };
  }

  return new Logger(options);
}
