/**
 * Import
 *
 * - typescript: `npm install -D typescript@5.3`
 * - eslint: `npm install -D eslint@8.56`
 * - parser: `npm install -D @typescript-eslint/parser@7.1`
 * - plugin: `npm install -D @typescript-eslint/eslint-plugin@7.1`
 *
 * Tip: eslint@"^8.57.0 || ^9.0.0"
 */
import typescriptBaseRules from '@/rules/typescript/typescriptBase';
import typescriptEslintRules from '@/rules/typescript/typescriptEslint';
import typescriptImportsRules from '@/rules/typescript/typescriptImports';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseTypescriptConfig = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    ...typescriptEslintRules.rules,
  },
  settings: {
    ...typescriptImportsRules.settings,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
        // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
        // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        // 'constructor-super': 'off',
        // 'getter-return': 'off',
        // 'no-const-assign': 'off',
        // 'no-dupe-args': 'off',
        // 'no-dupe-class-members': 'off',
        // 'no-dupe-keys': 'off',
        // 'no-func-assign': 'off',
        // 'no-import-assign': 'off',
        // 'no-new-symbol': 'off',
        // 'no-obj-calls': 'off',
        // 'no-redeclare': 'off',
        // 'no-setter-return': 'off',
        // 'no-this-before-super': 'off',
        // 'no-undef': 'off',
        // 'no-unreachable': 'off',
        // 'no-unsafe-negation': 'off',
        // 'valid-typeof': 'off',
        ...typescriptBaseRules.rules,

        // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
        // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
        // 'import/named': 'off',
        // 'import/no-named-as-default-member': 'off',
        // // Disable `import/no-unresolved`, see README.md for details
        // 'import/no-unresolved': 'off',
        ...typescriptImportsRules.rules,
      },
    },
  ],
} satisfies ESLint.ConfigData;

export default baseTypescriptConfig;
