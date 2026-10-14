import { legacyBaseConfig } from '@/legacy/configs/base/config';
import { allFilesExtensions, defineConfigArray } from '@/utils';

export const legacyBaseRecommendedConfig = defineConfigArray([
  ...Object.values(legacyBaseConfig),
  {
    name: 'e/config/base-configurations/legacy',
    files: allFilesExtensions,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
  },
]);
