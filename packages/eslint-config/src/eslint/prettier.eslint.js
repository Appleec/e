import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import { defineConfig } from './eslint-utils.js';

export const prettierConfig = defineConfig([
  {
    name: 'e/prettier/plugin',
    plugins: { prettier: prettierPlugin },
  },
  {
    name: 'e/prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);