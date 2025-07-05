/**
 * Import
 */
import nodeBaseRules from '@/rules/node/nodeBase';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseNodeConfig = {
  env: {
    node: true,
  },
  rules: {
    ...nodeBaseRules.rules,
  },
} satisfies ESLint.ConfigData;

export default baseNodeConfig;
