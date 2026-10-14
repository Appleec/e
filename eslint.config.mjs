// Import
import { configs } from '@elinzy/eslint-config';

export default [
  /**
   * ignores
   */
  {
    name: 'eslint-config/ignore/recommended',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests/**',
      '**/docs/**',
      '**/backup/**',
      '**/packages/eslint-config/**',
    ],
  },

  /**
   * base
   * need to install `eslint-plugin-import-x`
   * need to install `eslint-plugin-n`
   * need to install `typescript` and `typescript-eslint`
   */
  ...configs.flat.base.recommended,
  ...configs.flat.base.typescript,
  ...configs.flat.node.recommended,

  /**
   * fixture
   */
  {
    name: 'eslint-config/typescript/recommended-typescript',
    files: ['**/*.{ts,cts,mts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.eslint.json',
      },
    },
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    name: 'eslint-config/node/recommended',
    rules: {
      'n/global-require': 'off',
      'n/prefer-global/process': 'off',
      'n/exports-style': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
  {
    name: 'eslint-config/import/recommended',
    rules: {
      'import-x/namespace': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-import-module-exports': 'off',
      'import-x/no-rename-default': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-relative-packages': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },
  {
    name: 'eslint-config/base/recommended',
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'off',
      'no-void': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-multi-assign': 'off',
      'no-restricted-syntax': 'off',
      'prefer-rest-params': 'off',
      'dot-notation': 'off',
    },
  },
];
