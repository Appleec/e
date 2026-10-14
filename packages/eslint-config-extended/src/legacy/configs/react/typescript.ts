import { legacyBaseTypescriptConfig } from '@/legacy/configs/base/typescript';
import { allFilesExtensions, defineConfigArray, tsExtensionsWithAll, tsFilesExtensions } from '@/utils';

export const legacyReactTypescriptConfig = defineConfigArray([
  ...legacyBaseTypescriptConfig,
  {
    name: 'e/config/react-configurations/typescript/legacy',
    files: tsFilesExtensions,
    rules: {
      // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
      // Original: ['.jsx']
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
    },
  },
  {
    name: 'e/config/react-configurations/typescript-settings/legacy',
    files: allFilesExtensions,
    settings: {
      // Apply special parsing for TypeScript files
      'import/parsers': {
        '@typescript-eslint/parser': tsExtensionsWithAll,
      },
      // Append 'ts' extensions to Airbnb 'import/resolver' setting
      // Prepend 'mjs' to match shared config
      // Original: ['.js', '.jsx', '.json']
      'import/resolver': {
        node: {
          extensions: [...tsExtensionsWithAll, '.json'],
        },
        typescript: true,
      },
      // Append 'ts' extensions to Airbnb 'import/extensions' setting
      // Original: ['.js', '.mjs', '.jsx']
      'import/extensions': tsExtensionsWithAll,
    },
  },
]);
