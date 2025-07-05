/**
 * Import
 */
import nodeConfig from './config';
import nodeRecommendedExtensionsConfig from '@/extensions/node/recommended';

import type { Linter } from 'eslint';

/**
 * Config
 */
const nodeRecommendedConfig = [
  ...Object.values(nodeConfig),
  ...nodeRecommendedExtensionsConfig,
] satisfies Linter.Config[];

export default nodeRecommendedConfig;
