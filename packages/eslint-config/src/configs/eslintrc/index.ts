/**
 * Import
 */
import type { ESLint } from 'eslint';

import type base from './base';

/**
 * Config
 */
const eslintrc = {
  get base(): Record<keyof typeof base, ESLint.ConfigData> {
    return require('./base').default;
  },
};

export default eslintrc;
