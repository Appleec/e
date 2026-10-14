import plugin from '@stylistic/eslint-plugin';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

export const stylisticPlugin = defineConfigPlugin({
  name: 'e/config/plugin/stylistic',
  files: allFilesExtensions,
  plugins: {
    '@stylistic': plugin,
  },
});
