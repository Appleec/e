/**
 * Import
 */
import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseRecommendedScriptConfig = {
  extends: [
    './variants',
    './errors',
    './node',
    './style',
    './variables',
  ],
  env: {
    browser: true,
    node: true,
    amd: false,
    mocha: false,
    jasmine: false,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'script',
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'prefer-numeric-literals': 'off',
    'no-restricted-properties': ['error', {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    }, {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    }, {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    }],
    'no-var': 'off',
    'prefer-object-spread': 'off',
    strict: ['error', 'safe'],
  },
} satisfies ESLint.ConfigData;

export default baseRecommendedScriptConfig;
