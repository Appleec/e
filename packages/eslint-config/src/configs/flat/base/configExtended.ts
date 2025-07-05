/**
 * Import
 */
import baseConfig from '@/configs/flat/base/config';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseConfigExtended = {
  ...baseConfig,
} satisfies Record<string, Linter.Config>;

export default baseConfigExtended;
