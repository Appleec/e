import eslintConfig from '@elinzy/eslint-config';

console.log('\nbase.recommended=>', eslintConfig.configs.flat.base.recommended);
// console.log('\nbase.typescript=>', eslintConfig.configs.flat.base.typescript);
// console.log('\nnode.recommended=>', eslintConfig.configs.flat.node.recommended);

export default [
  ...eslintConfig.configs.flat.base.recommended,
  // ...eslintConfig.configs.flat.node.recommended,
  // ...eslintConfig.configs.flat.base.typescript,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests/**',
      '**/docs/**',
      '**/backup/**',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
