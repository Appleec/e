// Configs
import { nodeConfig } from '@/configs/node/config';

// Extensions
import { nodeRecommendedExtensionsConfig } from '@/extensions/node/recommended';

// Utils
import { defineConfigArray } from '@/utils';

export const nodeRecommendedConfig = defineConfigArray([
  ...Object.values(nodeConfig),
  ...nodeRecommendedExtensionsConfig,
]);
