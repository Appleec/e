import plugin from 'eslint-plugin-react';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

export const reactPlugin = defineConfigPlugin({
  name: 'e/config/plugin/react',
  files: allFilesExtensions,
  plugins: {
    react: plugin,
  },
});