// Imports
import { parser, plugin } from 'typescript-eslint';

// Utils
import {
  allFilesExtensions,
  defineConfigPlugin,
} from '@/utils';

export const typescriptEslintPlugin = defineConfigPlugin({
  name: 'e/config/plugin/typescript-eslint',
  files: allFilesExtensions,
  plugins: {
    '@typescript-eslint': plugin,
  },
  languageOptions: {
    parser,
  },
});
