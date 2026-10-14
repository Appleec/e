import { baseExtensions } from '@/extensions/base';
import { nodeExtensions } from '@/extensions/node';

export const extensions = {
  base: baseExtensions,
  node: nodeExtensions,
} as const;
