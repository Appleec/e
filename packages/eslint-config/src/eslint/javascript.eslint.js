import js from '@eslint/js';
import { configs, plugins } from '@elinzy/eslint-config-extended';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';

import { defineConfig } from './eslint-utils.js';

const promiseConfig = defineConfig([
  promisePlugin.configs['flat/recommended'],
]);

const unicornConfig = defineConfig([
  unicornPlugin.configs.recommended,
  {
    name: 'e/unicorn/rules',
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true,
          },
          multipleFileExtensions: false,
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/no-process-exit': 'off',
    },
  },
]);

export const jsConfig = defineConfig([
  { ...js.configs.recommended, name: 'e/js/recommended' },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  ...promiseConfig,
  ...unicornConfig,
]);