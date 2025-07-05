/**
 * Import
 */
import typescriptConfig from '../typescript/config';
import baseTypescriptExtensionsConfig from '@/extensions/base/typescript';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseTypescriptConfig = [
  ...Object.values(typescriptConfig),
  ...baseTypescriptExtensionsConfig,
] satisfies Linter.Config[];

export default baseTypescriptConfig;
