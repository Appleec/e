/**
 * Import
 */
import variablesRules from '@/rules/variables';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseVariablesConfig = {
  rules: {
    ...variablesRules.rules,

    // disallow declaration of variables that are not used in the code
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
  },
} satisfies ESLint.ConfigData;

export default baseVariablesConfig;
