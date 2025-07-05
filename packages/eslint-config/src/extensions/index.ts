/**
 * Import
 */
import type { Linter } from 'eslint';

import type baseExtensions from '@/extensions/base';

/**
 * Config
 */
const extensions = {
  get base(): Record<keyof typeof baseExtensions, Linter.Config[]> {
    return require('./base').default;
  },
};

export default extensions;
