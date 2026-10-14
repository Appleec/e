import { rules } from '@eslint/js';
import { plugins, rules as extendedRules } from '@elinzy/eslint-config-extended';

import { defineConfig } from './utils.mjs';

export const nodeConfig = defineConfig([
  plugins.node,
  {
    name: 'e/node/rules',
    rules: rules.node,
  },
  extendedRules.node,
]);