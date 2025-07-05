/**
 * Import
 */
import type { Linter } from 'eslint';

import errorsRules from '@/rules/errors';

/**
 * Config
 */
const baseErrorsConfig = {
  ...errorsRules,
} satisfies Linter.Config;

export default baseErrorsConfig;
