import { configs, plugins } from '@elinzy/eslint-config-extended';

export default [
  {
    name: 'e/ignore/recommended',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests/**',
      '**/docs/**',
      '**/backup/**',
      '**/packages/eslint-config/**',
    ],
  },

  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,

  plugins.typescriptEslint,
  ...configs.base.typescript,

  plugins.node,
  ...configs.node.recommended,

  // Project-specific overrides
  {
    name: 'e/typescript/relax',
    files: ['**/*.{ts,cts,mts,tsx}'],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    name: 'e/node/relax',
    rules: {
      'n/global-require': 'off',
      'n/prefer-global/process': 'off',
      'n/exports-style': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
  {
    name: 'e/base/relax',
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