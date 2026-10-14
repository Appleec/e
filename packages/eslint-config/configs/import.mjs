import { rules } from '@elinzy/eslint-config-extended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

import { defineConfig, getNoExtraneousDependenciesRule } from './utils.mjs';

const unusedImportConfig = defineConfig([
  {
    name: 'e/unused-imports/config',
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
]);

export const importConfig = defineConfig([
  ...unusedImportConfig,
  { ...rules.base, name: 'e/base-rules' },
  {
    name: 'e/import-x/rules',
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': getNoExtraneousDependenciesRule(),
    },
  },
]);