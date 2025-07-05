/**
 * Import
 */
import typescriptConfig from '../typescript/config';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseTypescriptConfig = [
  ...Object.values(typescriptConfig),
] satisfies Linter.Config[];

export default baseTypescriptConfig;
