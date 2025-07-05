/**
 * Import
 */
import variantsRules from '@/rules/variants';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseVariantsConfig = {
  rules: {
    ...variantsRules.rules,

    // enforces consistent newlines before or after dots
    // https://eslint.org/docs/rules/dot-location
    'dot-location': ['error', 'property'],

    // disallow the use of leading or trailing decimal points in numeric literals
    // https://eslint.org/docs/rules/no-floating-decimal
    'no-floating-decimal': 'error',

    // disallow use of multiple spaces
    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['error', {
      ignoreEOLComments: false,
    }],
  },
} satisfies ESLint.ConfigData;

export default baseVariantsConfig;
