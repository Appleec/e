/**
 * Import
 */
import {
  jsExtensions,
  tsExtensions,
  tsExtensionsResolver,
  tsExtensionsWithReact,
  tsExtensionsWithAll,
  extensionsRuleAssigner,
  extensionsPatternAssigner,
} from '@/utils/extensionsPattern';
import { getDevDeps } from '@/utils/filterPattern';
import { plugin } from '@/plugins/importXPlugin';
import { createNextImportResolver } from 'eslint-import-resolver-next';

import type { Linter } from 'eslint';

/**
 * Config
 *
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/src/config/typescript.ts
 */
const typescriptImportsXRules = {
  name: 'eslint-config/rules/typescript/imports-x',
  files: extensionsPatternAssigner([
    ...tsExtensionsWithAll,
  ]),
  plugins: {
    'import-x': plugin,
  },
  settings: {
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    // Original: ['.mjs', '.js', '.json']
    'import-x/resolver-next': [
      // need to install `eslint-plugin-n`
      plugin.createNodeResolver({
        extensions: [...tsExtensionsResolver, '.json'],
      }),
      // need to install `eslint-import-resolver-next`
      createNextImportResolver({
        packages: {
          pnpmWorkspace: true,
          includeRoot: true,
        },
      }),
    ],
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    // Original: ['.js', '.mjs', '.jsx']
    'import-x/extensions': tsExtensionsResolver,
    // Apply special parsing for TypeScript files
    'import-x/parsers': {
      '@typescript-eslint/parser': tsExtensionsResolver,
    },
    // Resolve type definition packages
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    // Append 'ts' and 'tsx' to Airbnb 'import-x/extensions' rule
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
    'import-x/extensions': ['error', 'ignorePackages', extensionsRuleAssigner([
      ...tsExtensionsWithReact,
    ])],

    // Append 'ts' and 'tsx' extensions to Airbnb 'import-x/no-extraneous-dependencies' rule
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
    'import-x/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: getDevDeps(
          [...jsExtensions, ...tsExtensions].map((ext) => ext.slice(1)).join(','),
        ),
        optionalDependencies: false,
        peerDependencies: true,
        bundledDependencies: true,
      },
    ],

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import

    // TypeScript compilation already ensures that named imports exist in the referenced module
    'import-x/named': 'off',
    // warn on accessing default export property names that are also named exports
    'import-x/no-named-as-default-member': 'off',
  },
} as unknown as Linter.Config;

export default typescriptImportsXRules;
