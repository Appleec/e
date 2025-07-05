import c from 'ansis';
import treeify from 'object-treeify';
import { error as symbol } from '../utils/symbols';
import { parseError } from '../utils/parseError';
import { processLog } from '../utils/processLog';

export function log(strings?: any, ...slots: any[]) {
  if (strings instanceof Error) {
    const error = strings;
    const { message, stackTree } = parseError(error);

    console.log('');
    console.log(c.bgRed.bold.white(` ${symbol} ${error.name || error['code'] || 'Error'} `) + ' ' + c.bold.red(message));

    if (stackTree) {
      console.log(treeify(stackTree, {
        spacerNeighbour: c.redBright.dim('│  '),
        keyNoNeighbour: c.redBright.dim('└ '),
        keyNeighbour: c.redBright.dim('├ '),
        separator: c.redBright.dim(': '),
      }));
    } else {
      console.log('');
      console.log({ ...error });
    }
    if (error.cause) {
      console.log('');
      console.log(c.redBright('Caused by:') + ' ' + error.cause);
    }
    console.log('');
    return message;
  }

  const message = processLog(strings, slots);
  console.log(message);
  return message;
}
