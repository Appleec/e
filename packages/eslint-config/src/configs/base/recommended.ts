// Configs
import { baseConfig } from '@/configs/base/config';

// Extensions
import { baseRecommendedExtensionsConfig } from '@/extensions/base/recommended';

// Utils
import { defineConfigArray } from '@/utils';

export const baseRecommendedConfig = defineConfigArray([
  ...Object.values(baseConfig),
  ...baseRecommendedExtensionsConfig,
]);
