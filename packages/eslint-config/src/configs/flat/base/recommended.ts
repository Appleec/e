/**
 * Import
 */
import baseConfig from './config';
import baseRecommendedExtensionsConfig from '@/extensions/base/recommended';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseRecommendedConfig = [
  ...Object.values(baseConfig),
  ...baseRecommendedExtensionsConfig,
] satisfies Linter.Config[];

export default baseRecommendedConfig;
