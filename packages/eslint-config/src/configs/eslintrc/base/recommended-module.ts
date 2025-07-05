/**
 * Import
 */
import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseRecommendedModuleConfig = {
  extends: [
    './variants',
    './errors',
    './node',
    './style',
    './variables',
    './es6',
    './imports',
    './strict',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {},
} satisfies ESLint.ConfigData;

export default baseRecommendedModuleConfig;
