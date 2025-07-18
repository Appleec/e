/**
 * Import
 */
import typescriptBaseRules from '@/rules/typescript/typescriptBase';
import typescriptEslintRules from '@/rules/typescript/typescriptEslint';
import typescriptImportsRules from '@/rules/typescript/typescriptImportsX';

import type { Linter } from 'eslint';

/**
 * Config
 */
const typescriptConfig = {
  base: typescriptBaseRules,
  typescriptEslint: typescriptEslintRules,
  imports: typescriptImportsRules,
} satisfies Record<string, Linter.Config>;

export default typescriptConfig;
