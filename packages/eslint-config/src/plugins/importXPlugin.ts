// Imports
import plugin from 'eslint-plugin-import-x';

import {
  allFilesExtensions,
  defineConfigPlugin,
} from '@/utils';

// Types
import type { ConfigPluginObject } from '@/types/common';

export const importXPluginConfig = defineConfigPlugin({
  name: 'e/config/plugin/import-x',
  files: allFilesExtensions,
  plugins: {
    'import-x': plugin,
  } as unknown as ConfigPluginObject,
});
