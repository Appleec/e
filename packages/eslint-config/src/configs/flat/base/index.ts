/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const base = {
  get recommended(): Linter.Config[] {
    return require('./recommended').default;
  },
  get typescript(): Linter.Config[] {
    return require('./typescript').default;
  },
};

export default base;
