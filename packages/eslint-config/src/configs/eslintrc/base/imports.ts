/**
 * Import
 */
import importsBaseRules from '@/rules/imports/importsBase';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseImportsConfig = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'import',
  ],
  settings: {
    ...importsBaseRules.settings,
  },
  rules: {
    ...importsBaseRules.rules,
  },
} satisfies ESLint.ConfigData;

export default baseImportsConfig;
