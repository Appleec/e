import config from '@elinzy/eslint-config/base';
import { defineConfig } from '@elinzy/eslint-config/utils';

export default defineConfig([
  ...config,
  {
    name: 'e/tests/relaxed-rules',
    files: ['tests/**/*.ts', 'vitest.config.ts'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'import-x/no-namespace': 'off',
    },
  },
]);