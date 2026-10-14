import { getImportSettings } from '@/helpers/getImportSettings';
import { defineConfigArray, tsFilesExtensions } from '@/utils';

export const reactTypescriptExtensionsConfig = defineConfigArray([
  {
    name: 'e/config/react-typescript-react',
    files: tsFilesExtensions,
    rules: {
      // only .jsx and .tsx files may have JSX
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
    },
  },
  {
    name: 'e/config/react-typescript-settings-extensions-configurations',
    files: tsFilesExtensions,
    settings: getImportSettings({ javascript: false, typescript: true, jsx: true }),
  },
]);
