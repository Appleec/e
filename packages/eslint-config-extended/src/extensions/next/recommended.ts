import { allFilesExtensions, defineConfigArray } from '@/utils';

export const nextRecommendedExtensionsConfig = defineConfigArray([
  {
    name: 'e/config/next-import-x',
    files: ['**/app/**/route.ts', '**/middleware.ts'],
    rules: {
      'import-x/prefer-default-export': 'off',
    },
  },
  {
    name: 'e/config/next-react-jsx-runtime',
    files: allFilesExtensions,
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
