/**
 * Import
 */
import baseConfig from './config';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseRecommendedConfig = [
  ...Object.values(baseConfig),
] satisfies Linter.Config[];

export default baseRecommendedConfig;
