import plugin from 'eslint-plugin-n';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

export const nodePlugin = defineConfigPlugin({
  name: 'e/config/plugin/node',
  files: allFilesExtensions,
  plugins: {
    n: plugin,
  },
});
