/**
 * Import
 */
import { plugin } from '@/plugins/nodeNPlugin';

import type { Linter } from 'eslint';

const nodeNPromisesRules = {
  name: 'eslint-config/rules/node-n-promises',
  plugins: {
    n: plugin,
  },
  rules: {
    // Enforce require("dns").promises
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/dns.md
    'n/prefer-promises/dns': 'error',

    // Enforce require("fs").promises
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/fs.md
    'n/prefer-promises/fs': 'error',
  },
} satisfies Linter.Config;

export default nodeNPromisesRules;
