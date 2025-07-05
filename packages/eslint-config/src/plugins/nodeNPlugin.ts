/**
 * Import
 */
import plugin from 'eslint-plugin-n';
import { hasPackage } from '@/utils/checked';

import type { Linter } from 'eslint';

/**
 * Config
 */
const config = {
  name: 'eslint-config/plugins/node',
  plugins: {
    n: plugin,
  },
} satisfies Linter.Config;

const checked = hasPackage('eslint-plugin-n');

export { plugin, config, checked };
export default config;
