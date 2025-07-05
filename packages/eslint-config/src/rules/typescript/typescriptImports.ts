/**
 * Import
 */
import {
  extensionsRuleAssigner,
  tsExtensionsResolver,
  jsExtensions,
  tsExtensions,
  tsExtensionsWithReact,
  extensionsPatternAssigner, tsExtensionsWithAll,
} from '@/utils/extensionsPattern';
import { getDevDeps } from '@/utils/filterPattern';

import type { Linter } from 'eslint';

/**
 * Config
 *
 * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/src/config/typescript.ts
 */
const typescriptImportsRules = {
  name: 'eslint-config/rules/typescript/imports',
  files: extensionsPatternAssigner([
    ...tsExtensionsWithAll,
  ]),
  settings: {
    // Apply special parsing for TypeScript files
    'import/parsers': {
      '@typescript-eslint/parser': tsExtensionsResolver,
    },
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    // Original: ['.mjs', '.js', '.json']
    'import/resolver': {
      node: {
        extensions: [...tsExtensionsResolver, '.json'],
      },
      // need to install `eslint-import-resolver-typescript`
      typescript: true,
      // need to install `eslint-import-resolver-next`
      next: {
        packages: {
          pnpmWorkspace: true,
          includeRoot: true,
        },
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    // Original: ['.js', '.mjs', '.jsx']
    'import/extensions': tsExtensionsResolver,
    // Resolve type definition packages
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    // Append 'ts' and 'tsx' to Airbnb 'import/extensions' rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', extensionsRuleAssigner([
      ...tsExtensionsWithReact,
    ])],

    // Append 'ts' and 'tsx' extensions to Airbnb 'import-x/no-extraneous-dependencies' rule
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: getDevDeps(
          [...jsExtensions, ...tsExtensions].map((ext) => ext.slice(1)).join(','),
        ),
        optionalDependencies: false,
      },
    ],

    // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
    // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
    'import/named': 'off',
    'import/no-named-as-default-member': 'off',
    // Disable `import/no-unresolved`, see README.md for details
    'import/no-unresolved': 'off',
  },
} satisfies Linter.Config;

export default typescriptImportsRules;
