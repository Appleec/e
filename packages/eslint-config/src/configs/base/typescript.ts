// Utils
import { defineConfigArray } from '@/utils';

// Configs
import { typescriptConfig } from '@/configs/typescript/config';

// Extensions
import { baseTypescriptExtensionsConfig } from '@/extensions/base/typescript';

export const baseTypescriptConfig = defineConfigArray([
  ...Object.values(typescriptConfig),
  ...baseTypescriptExtensionsConfig,
]);
