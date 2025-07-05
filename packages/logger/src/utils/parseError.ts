import dedent from 'dedent';
import chalk from 'ansis';

export function parseError(error: Error) {
  const { message, stack } = error;
  const stackTree = {};
  stack && dedent(stack
    .replace(message, '')
    .replace(/^Error: /, ''),
  )
    .split('\n')
    .forEach((line: string) => {
      const text = line
        .split(' ')
        .map((eachSplit) => eachSplit
          .replace(/^\((.+)\)$/, `${chalk.gray('$1')}`)
          .replace(/\./g, `${chalk.dim('.')}`)
          .replace(/^at$/, m => chalk.dim(m)),
        )
        .join(' ');
      if (text)
        stackTree[text] = null;
    });
  return {
    message: message
      .trim()
      .replace(/Error: /g, ''),
    stackTree: Object.keys(stackTree).length ? stackTree : null,
  };
}
