import { configs, plugins } from '@elinzy/eslint-config-extended';

export default [
  { ignores: ['**/dist/**', '**/node_modules/**'] },

  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,

  plugins.typescriptEslint,
  ...configs.base.typescript,

  plugins.node,
  ...configs.node.recommended,

  // Prettier integration
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
];