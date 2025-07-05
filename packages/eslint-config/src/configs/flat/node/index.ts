/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const node = {
  get recommended(): Linter.Config[] {
    return require('./recommended').default;
  },
};

export default node;
