import c from 'ansis';

export function paint(message: string) {
  return message
    .split(' ')
    .map((eachSplit) => eachSplit
      .replace(/^(\d*\.?\d*)$/g, `${c.blue('$1')}`)
      // 取代值與單位
      .replace(/^(\d*\.?\d*)(YB|ZB|EB|PB|TB|GB|MB|KB|B|mb|kb|kB|bit|zs|as|fs|ps|ns|µs|ms|s|m|h|d|m|y)$/g, `${c.cyan('$1')}${c.magenta('$2')}`)
      // timestamp
      .replace(/^((?:[0-1]?[0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9] (?:AM|PM)?)$/g, `${c.dim('$1')}`)
      // [pink]
      .replace(/^\[(.*?)\]$/g, `${c.dim('[')}${c.magenta('$1')}${c.dim(']')}`)
      // [normal]
      .replace(/^`(.*?)`$/g, `${c.dim('`')}$1${c.dim('`')}`)
      // (normal)
      .replace(/^\((.*?)\)$/g, `${c.dim('(')}$1${c.dim(')')}`)
      // <gray>
      .replace(/^<(.*?)>$/g, `${c.dim('<')}${c.gray('$1')}${c.dim('>')}`)
      // prettier arrows
      .replace(/->/g, c.dim('→'))
      .replace(/<-/g, c.dim('←'))
      // replace $t
      .replace(/^\$t$/g, `${c.dim(new Date().toLocaleTimeString())}`)
      // highlight
      .replace(/^\*\*(.*?)\*\*$/g, `${c.bold.white('$1')}`)
      // strikethrough
      .replace(/^~~(.*?)~~$/g, `${c.strikethrough('$1')}`)
      // underline
      .replace(/^__(.*?)__$/g, `${c.underline('$1')}`)
      // silence
      .replace(/^\.\.(.*?)\.\.$/g, `${c.dim('$1')}`)
      // warn
      .replace(/^!!(.*?)!!$/g, `${c.yellow('$1')}`)
      // italic
      .replace(/^\*(.*?)\*$/g, `${c.italic('$1')}`)
      .replace(/^_(.*?)_$/g, `${c.italic('$1')}`)
      // +
      .replace(/^\+(.*?)\+$/g, `${c.green('$1')}`)
      // -
      .replace(/^-(.*?)-$/g, `${c.red('$1')}`),
    )
    .join(' ');
}
