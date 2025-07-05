/**
 * Import
 */
import globals from 'globals';

import type { Linter } from 'eslint';
/**
 * Config
 */
const baseRecommendedExtensionsConfig = [
  /**
   * Basic configuration
   */
  {
    name: 'eslint-config/extensions/base/recommended',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2015,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
  },
] satisfies Linter.Config[];

export default baseRecommendedExtensionsConfig;
