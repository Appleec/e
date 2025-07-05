/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const baseExtensions = {
  get recommended(): Linter.Config[] {
    return [];
  },
  get typescript(): Linter.Config[] {
    return [];
  },
};

export default baseExtensions;
