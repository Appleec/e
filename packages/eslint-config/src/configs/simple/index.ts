/**
 * Import
 */
import type { Linter } from 'eslint';

import type base from './base';

/**
 * Config
 */
const flat = {
  get base(): Record<keyof typeof base, Linter.Config[]> {
    return require('./base').default;
  },
};

export default flat;
