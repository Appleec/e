import { baseConfigExtended } from '@/configs/base/configExtended';
import { nodeConfig } from '@/configs/node/config';
import { typescriptConfigExtended } from '@/configs/typescript/configExtended';

export const rules = {
  base: baseConfigExtended,
  node: nodeConfig,
  typescript: typescriptConfigExtended,
} as const;
