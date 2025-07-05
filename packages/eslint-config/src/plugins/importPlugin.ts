/**
 * Import
 */
import plugin from 'eslint-plugin-import';
import { hasPackage } from '@/utils/checked';

import type { Linter } from 'eslint';

/**
 * Config
 */
const config = {
  name: 'eslint-config/plugins/import',
  plugins: {
    'import': plugin,
  },
} as unknown as Linter.Config;

const checked = hasPackage('eslint-plugin-import');

export { plugin, config, checked };
export default { plugin, config, checked };
