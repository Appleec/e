import plugin from 'eslint-plugin-react-hooks';

import { allFilesExtensions, defineConfigPlugin } from '@/utils';

import type { ConfigPluginObject } from '@/types/common';

export const reactHooksPlugin = defineConfigPlugin({
  name: 'e/config/plugin/react-hooks',
  files: allFilesExtensions,
  plugins: {
    'react-hooks': plugin,
  } as ConfigPluginObject,
});