/**
 * Import
 */
import globals from 'globals';
import { isModule } from '@/utils/checkedModule';

import type { Linter } from 'eslint';

/**
 * Config
 */
const nodeRecommendedExtensionsConfig = [
  {
    name: 'eslint-config/extensions/recommended',
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: isModule() ? 'module' : 'commonjs',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
  },
  {
    name: 'eslint-config/extensions/recommended-for-module',
    files: ['**/*.mjs', '**/*.mts'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        __dirname: 'off',
        __filename: 'off',
        exports: 'off',
        module: 'off',
        require: 'off',
      },
    },
  },
  {
    name: 'eslint-config/extensions/recommended-for-script',
    files: ['**/*.cjs', '**/*.cts'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021,
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
] satisfies Linter.Config[];

export default nodeRecommendedExtensionsConfig;
