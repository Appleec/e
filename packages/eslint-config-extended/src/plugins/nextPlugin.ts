import plugin from '@next/eslint-plugin-next';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

export const nextPlugin = defineConfigPlugin({
  name: 'e/config/plugin/next',
  files: allFilesExtensions,
  plugins: {
    '@next/next': plugin,
  },
});