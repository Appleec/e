import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';

// import swc from '@rollup/plugin-swc';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';

import path from 'node:path';
// import { builtinModules } from 'node:module';
import pkg from './package.json' with { type: 'json' };

const isExternal = (id) => !path.isAbsolute(id) && !id.startsWith('.');

const banner = `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} Appleex
 * @license MIT
 */
`.trim();

/**
 * commonConfig
 * @type {RollupOptions}
 */
const commonConfig = defineConfig({
  input: 'src/index.ts',
  // external: isExternal,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {})
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'],
      exportConditions: ['node', 'import', 'require', 'default'],
    }),
    nodeExternals(),
    json(),
    commonjs({
      ignoreDynamicRequires: true,
    }),
    // swc({
    //   swc: {
    //     jsc: {
    //       parser: {
    //         syntax: 'typescript',
    //         tsx: true,
    //       },
    //       target: 'es2020',
    //       transform: {
    //         react: {
    //           runtime: 'automatic',
    //         },
    //       },
    //     },
    //     sourceMaps: false,
    //   },
    // }),
    esbuild(),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
            modules: false,
          },
        ],
        '@babel/preset-typescript',
      ],
      babelHelpers: 'bundled', // runtime bundled
      exclude: 'node_modules/**',
    }),
    dynamicImportVars({}),
  ],
});

/**
 * esmConfig
 * @type {RollupOptions}
 */
const esmConfig = defineConfig({
  ...commonConfig,
  output: {
    dir: 'dist',
    entryFileNames: '[name].mjs',
    chunkFileNames: '[name]-[hash].mjs',
    format: 'esm',
    sourcemap: false,
    preserveModules: true,
    // preserveModulesRoot: 'src',
  },
});

/**
 * cjsConfig
 * @type {RollupOptions}
 */
const cjsConfig = defineConfig({
  ...commonConfig,
  output: {
    dir: 'dist',
    entryFileNames: '[name].cjs',
    chunkFileNames: '[name]-[hash].cjs',
    format: 'cjs',
    sourcemap: false,
    preserveModules: true,
    // preserveModulesRoot: 'src',
  },
});

/**
 * dtsConfig
 * @type {RollupOptions}
 */
const dtsConfig = defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    entryFileNames: '[name].d.ts',
    format: 'es',
  },
  plugins: [
    dts({
      compilerOptions: {
        clean: true,
        removeComments: true,
      },
    }),
  ],
});

export default [dtsConfig, cjsConfig, esmConfig];
