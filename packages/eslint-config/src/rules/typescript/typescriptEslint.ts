/**
 * Import
 *
 * https://typescript-eslint.io/rules/
 * https://typescript-eslint.nodejs.cn/
 */
import { tsExtensionsWithAll, extensionsPatternAssigner } from '@/utils/extensionsPattern';
import { plugin, parser } from '@/plugins/typescriptEslintPlugin';

import variantsRules from '@/rules/variants';
import es6Rules from '@/rules/es6';
import styleRules from '@/rules/style';
import variablesRules from '@/rules/variables';

import type { Linter } from 'eslint';

/**
 * Config
 */
const typescriptEslintRules = {
  name: 'eslint-config/rules/typescript/typescript-eslint',
  files: extensionsPatternAssigner([
    ...tsExtensionsWithAll,
  ]),
  plugins: {
    '@typescript-eslint': plugin,
  },
  languageOptions: {
    parser,
    parserOptions: {
      projectService: false,
    },
  },
  rules: {
    // Require that function overload signatures be consecutive.
    // https://typescript-eslint.io/rules/adjacent-overload-signatures
    // Recommended in stylistic by the TypeScript Eslint team
    '@typescript-eslint/adjacent-overload-signatures': 'off',

    // Disallow awaiting a value that is not a Thenable.
    // https://typescript-eslint.io/rules/await-thenable
    '@typescript-eslint/await-thenable': 'off',

    // Disallow @ts-<directive> comments or require descriptions after directives.
    // https://typescript-eslint.io/rules/ban-ts-comment
    // Recommended by the TypeScript Eslint team
    // '@typescript-eslint/ban-ts-comment': 'off',

    // Disallow // tslint:<rule-flag> comments.
    // https://typescript-eslint.io/rules/ban-tslint-comment
    // '@typescript-eslint/ban-tslint-comment': 'error',

    // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
    // @deprecated and deleted by @typescript-eslint
    // 'brace-style': 'off',
    // '@typescript-eslint/brace-style': baseStyleRules['brace-style'],

    'camelcase': 'off',
    // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
    // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
    // @deprecated and deleted by @typescript-eslint
    // 'comma-dangle': 'off',
    // '@typescript-eslint/comma-dangle': [
    //   baseStyleRules['comma-dangle'][0],
    //   {
    //     ...baseStyleRules['comma-dangle'][1],
    //     enums: baseStyleRules['comma-dangle'][1].arrays,
    //     generics: baseStyleRules['comma-dangle'][1].arrays,
    //     tuples: baseStyleRules['comma-dangle'][1].arrays,
    //   },
    // ],

    // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'comma-spacing': 'off',
    // '@typescript-eslint/comma-spacing': baseStyleRules['comma-spacing'],

    // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': variantsRules.rules['default-param-last'],

    // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': [
      'error',
      {
        allowKeywords: true,
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowIndexSignaturePropertyAccess: false,
      },
    ],

    // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'func-call-spacing': 'off',
    // '@typescript-eslint/func-call-spacing': baseStyleRules['func-call-spacing'],

    // Replace Airbnb 'indent' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    // @deprecated and deleted by @typescript-eslint
    // indent: 'off',
    // '@typescript-eslint/indent': baseStyleRules.indent,

    // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'keyword-spacing': 'off',
    // '@typescript-eslint/keyword-spacing': baseStyleRules['keyword-spacing'],

    // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    // @deprecated and deleted by @typescript-eslint
    // 'lines-between-class-members': 'off',
    // '@typescript-eslint/lines-between-class-members': baseStyleRules['lines-between-class-members'],

    // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': styleRules.rules['no-array-constructor'],

    // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'off',

    // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': variantsRules.rules['no-empty-function'],

    // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
    // 'no-extra-parens': 'off',
    // '@typescript-eslint/no-extra-parens': errorsRules.rules['no-extra-parens'],

    // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
    // @deprecated and deleted by @typescript-eslint
    // 'no-extra-semi': 'off',
    // '@typescript-eslint/no-extra-semi': baseErrorsRules['no-extra-semi'],

    // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    'no-implied-eval': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-implied-eval': variantsRules.rules['no-implied-eval'],

    // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    '@typescript-eslint/no-loss-of-precision': 'off',

    // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': variantsRules.rules['no-loop-func'],

    // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    '@typescript-eslint/no-magic-numbers': 'off',

    // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
    '@typescript-eslint/no-redeclare': 'off',

    // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': variablesRules.rules['no-shadow'],

    // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-before-blocks': 'off',
    // '@typescript-eslint/space-before-blocks': baseStyleRules['space-before-blocks'],

    // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    // @deprecated and deleted by @typescript-eslint
    // 'no-throw-literal': 'off',
    // '@typescript-eslint/no-throw-literal': baseBestPracticesRules['no-throw-literal'],

    // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': variantsRules.rules['no-unused-expressions'],

    // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': variablesRules.rules['no-unused-vars'],

    // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': variablesRules.rules['no-use-before-define'],

    // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': es6Rules.rules['no-useless-constructor'],

    // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
    // @deprecated and deleted by @typescript-eslint
    // quotes: 'off',
    // '@typescript-eslint/quotes': baseStyleRules.quotes,

    // Replace Airbnb 'semi' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
    // @deprecated and deleted by @typescript-eslint
    // semi: 'off',
    // '@typescript-eslint/semi': baseStyleRules.semi,

    // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-before-function-paren': 'off',
    // '@typescript-eslint/space-before-function-paren': baseStyleRules['space-before-function-paren'],

    // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
    '@typescript-eslint/require-await': 'off',

    // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    // https://typescript-eslint.nodejs.cn/rules/return-await
    'no-return-await': 'off',
    '@typescript-eslint/return-await': [
      'error',
      'in-try-catch',
    ],

    // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-infix-ops': 'off',
    // '@typescript-eslint/space-infix-ops': baseStyleRules['space-infix-ops'],

    // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'object-curly-spacing': 'off',
    // '@typescript-eslint/object-curly-spacing': baseStyleRules['object-curly-spacing'],
  },
} as unknown as Linter.Config;

export default typescriptEslintRules;
