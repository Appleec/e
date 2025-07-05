/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const nodeBaseRules = {
  name: 'eslint-config/rules/node/node-base',
  rules: {
    // enforce return after a callback
    // https://eslint.nodejs.cn/docs/latest/rules/callback-return#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'callback-return': 'off',

    // require all requires be top-level
    // https://eslint.nodejs.cn/docs/latest/rules/global-require#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'global-require': 'error',

    // enforces error handling in callbacks (node environment)
    // https://eslint.nodejs.cn/docs/latest/rules/handle-callback-err#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'handle-callback-err': 'off',

    // disallow use of the Buffer() constructor
    // https://eslint.nodejs.cn/docs/latest/rules/no-buffer-constructor#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-buffer-constructor': 'error',

    // disallow mixing regular variable and require declarations
    // https://eslint.nodejs.cn/docs/latest/rules/no-mixed-requires#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-mixed-requires': 'off',

    // disallow use of new operator with the require function
    // https://eslint.nodejs.cn/docs/latest/rules/no-new-require#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-new-require': 'error',

    // disallow string concatenation with __dirname and __filename
    // https://eslint.nodejs.cn/docs/latest/rules/no-path-concat#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-path-concat': 'error',

    // disallow use of process.env
    // https://eslint.nodejs.cn/docs/latest/rules/no-process-env#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-process-env': 'off',

    // disallow process.exit()
    // https://eslint.nodejs.cn/docs/latest/rules/no-process-exit#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-process-exit': 'off',

    // restrict usage of specified node modules
    // https://eslint.nodejs.cn/docs/latest/rules/no-restricted-modules#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-restricted-modules': 'off',

    // disallow use of synchronous methods (off by default)
    // https://eslint.nodejs.cn/docs/latest/rules/no-sync#rule-details
    // NOTE: This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-sync': 'off',
  },
} satisfies Linter.Config;

export default nodeBaseRules;
