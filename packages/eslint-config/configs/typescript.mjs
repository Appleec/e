import { configs, plugins, rules } from '@elinzy/eslint-config-extended';

import { defineConfig } from './utils.mjs';

export const tsConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript,
]);