/**
 * Import
 */
import { parser, plugin } from 'typescript-eslint';
import { tsExtensionsWithAll, extensionsPatternAssigner } from '@/utils/extensionsPattern';
import { hasPackage } from '@/utils/checked';

import type { Linter } from 'eslint';

/**
 * Config
 */
const config = {
  name: 'eslint-config/plugins/typescript-eslint',
  files: extensionsPatternAssigner([
    ...tsExtensionsWithAll,
  ]),
  languageOptions: {
    parser,
  },
  plugins: {
    '@typescript-eslint': plugin,
  },
} as unknown as Linter.Config;

const checked = hasPackage('typescript-eslint');

export { plugin, parser, config, checked };
export default config;
