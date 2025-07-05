/**
 * Import
 */
import type { Linter } from 'eslint';

import type base from './base';
import type node from './node';

/**
 * Config
 */
const flat = {
  get node(): Record<keyof typeof node, Linter.Config[]> {
    return require('./node').default;
  },
  get base(): Record<keyof typeof base, Linter.Config[]> {
    return require('./base').default;
  },
};

export default flat;
