import c from 'ansis';

/**
 * Print step topic
 * @param {string} value
 * @param {Object} [opts = { prefix: '#', level: 0 }]
 */
export function printStep(
  value = 'Step',
  opts = { prefix: '#', level: 0, compact: false },
) {
  let prefix = '';
  if (opts.prefix)
    prefix = (+opts.level > 1)
      ? opts.prefix.repeat(opts.level)
      : opts.prefix;

  if (!opts.compact) console.log();
  console.log(c.cyan(`${prefix} ${value}`));
  if (!opts.compact) console.log();
}

/**
 * Print value list by action
 * @param values
 * @param opts
 */
export function printValues(
  values: any[],
  opts?,
) {
  const _opts = {
    action: 'changed', // changed update remove add
    compact: false,
  };

  if (typeof opts === 'string')
    _opts.action = opts;
  if (typeof opts === 'object')
    Object.assign(_opts, opts);

  if (!values.length) {
    if (!_opts.compact) console.log();
    console.log(c.blue`i` + c.gray` No ${_opts.action ?? 'changed'}.`);
    if (!_opts.compact) console.log();
    return;
  }

  const prettified = values
    .filter(Boolean)
    .map((v) => c.green.underline(v));

  if (!opts.compact) console.log();
  console.log(c.bold`${c.green(values.length)} ${_opts.action ?? 'changed'}:`);
  if (!opts.compact) console.log();
  console.log(prettified.join('\n'));
  if (!opts.compact) console.log();
}

console.time('print values');

printValues([]);
console.timeEnd('print values');
