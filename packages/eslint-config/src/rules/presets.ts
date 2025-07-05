/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const usage = {
  rules: {
    // https://eslint.nodejs.cn/docs/latest/rules/strict#rule-details
    // 'strict': ['error', 'global'],

    // https://eslint.nodejs.cn/docs/latest/rules/camelcase#rule-details
    // NOTE: Needs to enable the rule in next version
    'camelcase': ['off', {
      'properties': 'never',
      'ignoreDestructuring': true,
      'ignoreImports': true,
      'ignoreGlobals': true,
    }],

    // https://eslint.nodejs.cn/docs/latest/rules/no-dupe-else-if#rule-details
    'no-dupe-else-if': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-duplicate-case#rule-details
    'no-duplicate-case': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/valid-typeof#rule-details
    'valid-typeof': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/arrow-body-style#rule-details
    // TODO: enable requireReturnForObjectLiteral?
    'arrow-body-style': ['error', 'as-needed'],

    // https://eslint.nodejs.cn/docs/latest/rules/default-case#rule-details
    'default-case': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/default-case-last#rule-details
    'default-case-last': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-return-assign#rule-details
    'no-return-assign': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-self-compare#rule-details
    'no-self-compare': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-throw-literal#rule-details
    'no-throw-literal': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/object-shorthand
    'object-shorthand': ['error', 'consistent-as-needed'],

    // https://eslint.nodejs.cn/docs/latest/rules/prefer-template#rule-details
    // 'prefer-template': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/yoda#rule-details
    'yoda': ['error', 'never', { exceptRange: true }],

    // https://eslint.nodejs.cn/docs/latest/rules/new-cap#rule-details
    'new-cap': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-use-before-define#rule-details
    'no-use-before-define': ['error', {
      functions: false,
      classes: false,
      // Only in Typescript
      // enums: false,
      // typedefs: true,
      // ignoreTypeReferences: false,
    }],

    // https://eslint.nodejs.cn/docs/latest/rules/no-var#rule-details
    'no-var': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-with#rule-details
    'no-with': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-undef#rule-details
    'no-undef': ['error', { typeof: true }],

    // https://eslint.nodejs.cn/docs/latest/rules/no-undef-init#rule-details
    // NOTE - It marked as frozen
    'no-undef-init': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-undefined#rule-details
    'no-undefined': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-unused-vars#rule-details
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none',
      'caughtErrors': 'none',
      'ignoreRestSiblings': false,
      // 'reportUsedIgnorePattern': false,
    }],

    // https://eslint.nodejs.cn/docs/latest/rules/no-empty
    'no-empty': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-empty-function
    'no-empty-function': ['error', { allow: ['functions'] }],

    // https://eslint.nodejs.cn/docs/latest/rules/no-debugger#rule-details
    'no-debugger': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-obj-calls#rule-details
    'no-obj-calls': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-new-symbol#rule-details
    // NOTE - This rule was deprecated in ESLint v9.0.0. Please replace the rule with no-new-native-nonconstructor.
    'no-new-symbol': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-new-native-nonconstructor#rule-details
    // TODO - remove this once we no longer support ESLint v8
    'no-new-native-nonconstructor': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-async-promise-executor#rule-details
    'no-async-promise-executor': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-useless-constructor#rule-details
    'no-useless-constructor': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-unreachable#rule-details
    'no-unreachable': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-this-before-super#rule-details
    'no-this-before-super': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-unsafe-negation#rule-details
    'no-unsafe-negation': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-import-assign#rule-details
    'no-import-assign': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-func-assign#rule-details
    'no-func-assign': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-dupe-class-members#rule-details
    'no-dupe-class-members': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-dupe-args#rule-details
    'no-dupe-args': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-dupe-keys#rule-details
    'no-dupe-keys': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-const-assign#rule-details
    'no-const-assign': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-class-assign#rule-details
    'no-class-assign': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-misleading-character-class#rule-details
    'no-misleading-character-class': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-case-declarations#rule-details
    'no-case-declarations': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-setter-return#rule-details
    'no-setter-return': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/no-constant-condition
    'no-constant-condition': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-redeclare
    'no-redeclare': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-fallthrough#rule-details
    'no-fallthrough': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-useless-escape#rule-details
    'no-useless-escape': 'off',

    // https://eslint.org/docs/latest/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/no-process-exit#rule-details
    // This rule was deprecated in ESLint v7.0.0. Please use the corresponding rule in eslint-plugin-n.
    'no-process-exit': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/prefer-const#rule-details
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],

    // https://eslint.nodejs.cn/docs/latest/rules/prefer-rest-params#rule-details
    'prefer-rest-params': 'off',

    // https://eslint.nodejs.cn/docs/latest/rules/constructor-super#rule-details
    'constructor-super': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/prefer-spread#rule-details
    'prefer-spread': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/getter-return#rule-details
    'getter-return': 'error',

    // https://eslint.nodejs.cn/docs/latest/rules/require-await#rule-details
    'require-await': 'error',
  },
} satisfies Linter.Config;

export default usage;
