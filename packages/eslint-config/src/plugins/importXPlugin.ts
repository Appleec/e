/**
 * Import
 */
import plugin from 'eslint-plugin-import-x';
import { hasPackage } from '@/utils/checked';

import type { Linter } from 'eslint';

/**
 * Config
 */
const config = {
  name: 'eslint-config/plugins/import-x',
  plugins: {
    'import-x': plugin,
  },
} as unknown as Linter.Config;

const checked = hasPackage('eslint-plugin-import');

export { plugin, config, checked };
export default config;
