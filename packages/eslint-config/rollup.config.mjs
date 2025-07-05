import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodeExternals from 'rollup-plugin-node-externals';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default [
  {
    input: ['src/index.ts'],
    output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: '[name].d.ts',
    },
    plugins: [
        nodeResolve(),
        nodeExternals(),
        dts({
            compilerOptions: {
                clean: true,
                removeComments: true,
            },
        }),
    ],
  },
  // rules
  {
    input: {
      // index
      'index': 'src/index.ts',

      // utils
      'utils/extensionsPattern': 'src/utils/extensionsPattern.ts',
      'utils/checked': 'src/utils/checked.ts',
      'utils/filterPattern': 'src/utils/filterPattern.ts',
      'utils/checkedModule': 'src/utils/checkedModule.ts',
      'utils/Cache': 'src/utils/Cache.ts',

      // plugins
      'plugins/index': 'src/plugins/index.ts',
      'plugins/importPlugin': 'src/plugins/importPlugin.ts',
      'plugins/importXPlugin': 'src/plugins/importXPlugin.ts',
      'plugins/nodeNPlugin': 'src/plugins/nodeNPlugin.ts',
      'plugins/typescriptEslintPlugin': 'src/plugins/typescriptEslintPlugin.ts',
      //
      // extensions
      'extensions/index': 'src/extensions/index.ts',
      // extensions/base
      'extensions/base/index': 'src/extensions/base/index.ts',
      'extensions/base/recommended': 'src/extensions/base/recommended.ts',
      // extensions/node
      'extensions/node/index': 'src/extensions/node/index.ts',
      'extensions/node/recommended': 'src/extensions/node/recommended.ts',

      // rules
      'rules/index': 'src/rules/index.ts',
      'rules/variants': 'src/rules/variants.ts',
      'rules/variables': 'src/rules/variables.ts',
      'rules/style': 'src/rules/style.ts',
      'rules/errors': 'src/rules/errors.ts',
      'rules/strict': 'src/rules/strict.ts',
      'rules/node/nodeBase': 'src/rules/node/nodeBase.ts',
      'rules/node/nodeNBase': 'src/rules/node/nodeNBase.ts',
      'rules/node/nodeNGlobals': 'src/rules/node/nodeNGlobals.ts',
      'rules/node/nodeNPromises': 'src/rules/node/nodeNPromises.ts',
      'rules/es6': 'src/rules/es6.ts',
      // 'rules/imports/index': 'src/rules/imports/index.ts',
      'rules/imports/importsBase': 'src/rules/imports/importsBase.ts',
      'rules/imports/importsXBase': 'src/rules/imports/importsXBase.ts',
      'rules/typescript/typescriptBase': 'src/rules/typescript/typescriptBase.ts',
      'rules/typescript/typescriptEslint': 'src/rules/typescript/typescriptEslint.ts',
      'rules/typescript/typescriptImports': 'src/rules/typescript/typescriptImports.ts',
      'rules/typescript/typescriptImportsX': 'src/rules/typescript/typescriptImportsX.ts',

      // configs
      'configs/index': 'src/configs/index.ts',

      // configs/eslintrc
      'configs/eslintrc/index': 'src/configs/eslintrc/index.ts',
      // configs/eslintrc/base
      'configs/eslintrc/base/index': 'src/configs/eslintrc/base/index.ts',
      'configs/eslintrc/base/variants': 'src/configs/eslintrc/base/variants.ts',
      'configs/eslintrc/base/variables': 'src/configs/eslintrc/base/variables.ts',
      'configs/eslintrc/base/style': 'src/configs/eslintrc/base/style.ts',
      'configs/eslintrc/base/errors': 'src/configs/eslintrc/base/errors.ts',
      'configs/eslintrc/base/strict': 'src/configs/eslintrc/base/strict.ts',
      'configs/eslintrc/base/node': 'src/configs/eslintrc/base/node.ts',
      'configs/eslintrc/base/es6': 'src/configs/eslintrc/base/es6.ts',
      'configs/eslintrc/base/imports': 'src/configs/eslintrc/base/imports.ts',
      'configs/eslintrc/base/recommended': 'src/configs/eslintrc/base/recommended.ts',
      'configs/eslintrc/base/recommended-module': 'src/configs/eslintrc/base/recommended-module.ts',
      'configs/eslintrc/base/recommended-script': 'src/configs/eslintrc/base/recommended-script.ts',
      'configs/eslintrc/base/typescript': 'src/configs/eslintrc/base/typescript.ts',

      // configs/flat
      'configs/flat/index': 'src/configs/flat/index.ts',
      // configs/flat/base
      'configs/flat/base/index': 'src/configs/flat/base/index.ts',
      'configs/flat/base/config': 'src/configs/flat/base/config.ts',
      'configs/flat/base/recommended': 'src/configs/flat/base/recommended.ts',
      'configs/flat/base/typescript': 'src/configs/flat/base/typescript.ts',
      // configs/flat/node
      'configs/flat/node/index': 'src/configs/flat/node/index.ts',
      'configs/flat/node/config': 'src/configs/flat/node/config.ts',
      'configs/flat/node/recommended': 'src/configs/flat/node/recommended.ts',
      // configs/flat/typescript
      // 'configs/flat/typescript/config': 'src/configs/flat/typescript/config.ts',
    },
    output: [
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: '[name].js',
        exports: 'named',
        // esModule: 'if-default-prop',
        hoistTransitiveImports: false,
        // interop: 'auto',
      },
    ],
    plugins: [
      nodeExternals(),
      nodeResolve(),
      alias({
        customResolver: nodeResolve({
          extensions: ['.tsx', '.ts'],
        }),
        entries: {
          '@': path.resolve(dirname, 'src'),
        },
      }),
      esbuild({
        minify: process.env.NODE_ENV === 'production',
      }),
      babel({
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        babelHelpers: 'bundled',
      }),
    ],
  },
  // configs/eslintrc or configs/flat
  // {
  //   input: {
  //     'eslintrc/base': 'src/configs/eslintrc/base.ts',
  //     'eslintrc/node': 'src/configs/eslintrc/node.ts',
  //     'eslintrc/es6': 'src/configs/eslintrc/es6.ts',
  //     'eslintrc/imports': 'src/configs/eslintrc/imports.ts',
  //     'eslintrc/typescript': 'src/configs/eslintrc/typescript.ts',
  //     'eslintrc/cjs': 'src/configs/eslintrc/cjs.ts',
  //     'eslintrc/esm': 'src/configs/eslintrc/esm.ts',
  //     'eslintrc/recommended': 'src/configs/eslintrc/recommended.ts',
  //   },
  //   output: [
  //     {
  //       format: 'cjs',
  //       dir: 'dist/configs',
  //       entryFileNames: '[name].js',
  //       // exports: 'auto',
  //       // interop: 'default',
  //       preserveModules: false,
  //     },
  //   ],
  //   plugins: [
  //     nodeResolve(),
  //     nodeExternals(),
  //     esbuild(),
  //     babel({
  //       presets: ['@babel/preset-env', '@babel/preset-typescript'],
  //       babelHelpers: 'bundled',
  //     }),
  //     isProd && cleanup({
  //       comments: 'none',
  //       compactComments: true,
  //       extensions: ['js', 'cjs', 'mjs', 'ts'],
  //     }),
  //     // minify(),
  //   ],
  // },
];
