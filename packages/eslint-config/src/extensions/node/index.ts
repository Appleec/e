/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const nodeExtensions = {
  get recommended(): Linter.Config[] {
    return require('./recommended').default;
  },
};

export default nodeExtensions;
