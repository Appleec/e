import config from './base.mjs';
import { defineConfig } from './utils.mjs';

export default defineConfig([
  ...config,
  {
    name: 'e/import-x/disable-extensions-in-module-files',
    files: ['**/*.js'],
    rules: { 'import-x/extensions': 'off' },
  },
  {
    name: 'e/import-x/disable-relative-packages-for-configs',
    files: ['**/eslint.config.*'],
    rules: { 'import-x/no-relative-packages': 'off' },
  },
]);