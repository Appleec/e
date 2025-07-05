/**
 * Import
 */
import nodeBaseRules from '@/rules/node/nodeNBase';
import nodeGlobalsRules from '@/rules/node/nodeNGlobals';
import nodePromisesRules from '@/rules/node/nodeNPromises';

import type { Linter } from 'eslint';

/**
 * Config
 */
const nodeConfig = {
  base: nodeBaseRules,
  globals: nodeGlobalsRules,
  promises: nodePromisesRules,
} satisfies Record<string, Linter.Config>;

export default nodeConfig;
