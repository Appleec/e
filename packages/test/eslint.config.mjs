import { configs, plugins, rules } from '@elinzy/eslint-config';

import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default [
  // // stylistic plugin
  // plugins.stylistic,
  //
  // // tsConfig
  // // TypeScript ESLint plugin
  // plugins.typescriptEslint,
  // // Airbnb base TypeScript config
  // ...configs.base.typescript,
  // // Strict TypeScript rules
  // rules.typescript.typescriptEslintStrict,
  //
  // // nodeConfig
  // // Node plugin
  // plugins.node,
  // // Node recommended config
  // // ...configs.node.recommended,
  // // Node rules
  // {
  //   name: 'x/n/rules',
  //   rules: {
  //     'n/no-process-exit': 'off',
  //     'n/no-sync': 'off',
  //     'n/hashbang': 'off',
  //   },
  // },
  //
  // // importsConfig
  // // Unused Imports config
  // {
  //   name: 'unused-imports/config',
  //   plugins: {
  //     'unused-imports': unusedImportsPlugin,
  //   },
  //   rules: {
  //     'unused-imports/no-unused-imports': 'error',
  //   },
  // },
  // // import plugin
  // plugins.importX,
  // // Strict imports rules
  // rules.base.importsStrict,
  // // Import X rules
  // {
  //   name: 'x/import-x/rules',
  //   rules: {
  //     'import-x/prefer-default-export': 'off',
  //     // 'import-x/no-extraneous-dependencies': getNoExtraneousDependenciesRule(),
  //   },
  // },
  //
  // // General ESLint rules
  // {
  //   name: 'x/general/rules',
  //   rules: {
  //     'no-console': 'off',
  //     'no-void': 'off',
  //     'consistent-return': 'off',
  //     'no-array-constructor': 'off',
  //     'no-underscore-dangle': [
  //       'error',
  //       {
  //         allow: ['_id'],
  //       },
  //     ],
  //     'no-restricted-syntax': [
  //       'error',
  //       'ForStatement',
  //       'ContinueStatement',
  //       'DoWhileStatement',
  //       'WhileStatement',
  //       'WithStatement',
  //     ],
  //   },
  // },
  //
  //  // Restrict user to use absolute paths
  // {
  //   name: 'x/general/ts-only',
  //   files: ['**/*.{ts,cts,mts,tsx}'],
  //   rules: {
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         patterns: [
  //           {
  //             group: ['./*', '../*'],
  //             message: "Please use the absolute path '@/*' instead.",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },

  // Unused Imports config
  {
    name: 'unused-imports/config',
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },

  plugins.stylistic,
  plugins.importX,
  // base recommended config
  ...configs.base.recommended,

  plugins.node,
  ...configs.node.recommended,
  // Node rules
  {
    name: 'x/n/rules',
    rules: {
      'n/no-process-exit': 'off',
      'n/no-sync': 'off',
      'n/hashbang': 'off',
    },
  },

  // General ESLint rules
  {
    name: 'x/general/rules',
    rules: {
      'no-console': 'off',
      'no-void': 'off',
      'consistent-return': 'off',
      'no-array-constructor': 'off',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        'ForStatement',
        'ContinueStatement',
        'DoWhileStatement',
        'WhileStatement',
        'WithStatement',
      ],
    },
  },

  // Restrict user to use absolute paths
  {
    name: 'x/general/ts-only',
    files: ['**/*.{ts,cts,mts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: "Please use the absolute path '@/*' instead.",
            },
          ],
        },
      ],
    },
  },
]
