import { configs, plugins, rules } from '@elinzy/eslint-config-extended';

import { defineConfig } from './eslint-utils.js';

export const tsConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript,
]);