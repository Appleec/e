// Import
import eslintConfig, { plugins } from '@elinzy/eslint-config';

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
    ],
  },

  /**
   * base
   * need to install `eslint-plugin-import-x`
   */
  ...eslintConfig.configs.flat.base.recommended,

  /**
   * node
   * need to install `eslint-plugin-n`
   */
  ...eslintConfig.configs.flat.node.recommended,
  {
    name: 'eslint-config/node/recommended',
    plugins: plugins.nodeN.plugins,
    rules: {
      'n/global-require': 'off',
      'n/prefer-global/process': 'off',
      'n/exports-style': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },

  /**
   * typescript
   * need to install `typescript` and `typescript-eslint`
   */
  ...eslintConfig.configs.flat.base.typescript,
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
    name: 'eslint-config/import/recommended',
    rules: {
      'import-x/namespace': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-import-module-exports': 'off',
      'import-x/no-rename-default': 'off',
      // 'import/no-named-as-default': 'off',
      'import-x/order': [
        'off',
        {
          groups: [['builtin', 'external', 'internal', 'sibling', 'type']],
        },
      ],
    },
  },
  {
    name: 'eslint-config/import/disable-extensions-in-module-files',
    files: ['**/*.mjs', '**/*.mts'],
    rules: {
      'import-x/extensions': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },

  {
    name: 'eslint-config/general/recommended',
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
