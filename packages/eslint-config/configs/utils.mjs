import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootPath = path.resolve(dirname, '..', '..', '..');
export const gitIgnoreFile = includeIgnoreFile(path.resolve(rootPath, '.gitignore'));
export { defineConfig, globalIgnores };

export const getNoExtraneousDependenciesRule = (whitelist = []) => [
  'error',
  {
    devDependencies: [
      '**/*.test.*',
      '**/*.spec.*',
      '**/tests/**',
      '**/rollup.config.*',
      '**/vitest.config.*',
      '**/eslint.config.*',
      '**/prettier.config.*',
      '**/tsdown.config.*',
    ],
    optionalDependencies: false,
    whitelist: [
      '@elinzy/eslint-config',
      ...whitelist,
    ],
  },
];