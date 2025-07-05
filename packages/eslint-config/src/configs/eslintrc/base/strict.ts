/**
 * Import
 */
import strictRules from '@/rules/strict';

import type { ESLint } from 'eslint';

/**
 * Config
 */
const baseStrictConfig = {
  ...strictRules,
} satisfies ESLint.ConfigData;

export default baseStrictConfig;
