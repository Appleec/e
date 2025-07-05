/**
 * Import
 */
import type { Linter } from 'eslint';

import type baseConfig from '@/configs/flat/base/config';
import type nodeConfig from '@/configs/flat/node/config';
import type typescriptConfig from '@/configs/flat/typescript/config';
/**
 * Config
 */
const rules = {
  get base(): Record<keyof typeof baseConfig, Linter.Config> {
    return require('../configs/flat/base/config').default;
  },
  get node(): Record<keyof typeof nodeConfig, Linter.Config> {
    return require('../configs/flat/node/config').default;
  },
  get typescript(): Record<keyof typeof typescriptConfig, Linter.Config> {
    return require('../configs/flat/typescript/config').default;
  },
};

export default rules;
