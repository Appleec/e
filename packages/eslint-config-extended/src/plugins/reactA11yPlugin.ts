import plugin from 'eslint-plugin-jsx-a11y';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

export const reactA11yPlugin = defineConfigPlugin({
  name: 'e/config/plugin/react-a11y',
  files: allFilesExtensions,
  plugins: {
    'jsx-a11y': plugin,
  },
});