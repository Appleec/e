/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const strictRules = {
  name: 'eslint-config/rules/strict',
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
} satisfies Linter.Config;

export default strictRules;
