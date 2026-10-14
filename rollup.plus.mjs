import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

// import swc from '@rollup/plugin-swc';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';

import path from 'node:path';
import { builtinModules } from 'node:module';

// const banner = `
// /*!
//  * ${pkg.name} v${pkg.version}
//  * (c) ${new Date().getFullYear()} Appleex
//  * @license MIT
//  */
// `.trim();

/**
 * Create a base rollup config
 * @returns {import('rollup').RollupOptions}
 */
export function createConfig(
  customOptions = {},
) {
  const {
    pkg = {},
    pkgRoot = process.cwd(),
    preserveModules = false,
    external = [],
  } = customOptions;

  return {
    input: 'src/index.ts',
    external: (id) => {
      // ALWAYS Bundle: Relative paths, absolute paths, and Rollup virtual modules
      if (id.startsWith('.') || id.startsWith('/') || id.startsWith('\0')) {
        return false
      }

      // ALWAYS Bundle: Your internal path alias (e.g., "@/configs")
      // We return false so Rollup tries to resolve it via the alias plugin
      if (id.startsWith('@/') || id === 'src' || id.startsWith('src/')) {
        return false
      }

      const isDep = external.some((dep) => id === dep || id.startsWith(`${dep}/`))

      if (isDep) {
        return true;
      }

      // EXCLUDE: Everything else (External)
      // This correctly excludes:
      // - Standard packages: 'lodash'
      // - Scoped packages: '@org/utils' (including pnpm workspace brothers)
      // - Node built-ins: 'node:fs'
      return true
    },
    onwarn(warning, warn) {
      // throw Object.assign(new Error(), warning);
      // Prevent specific warnings from crashing the build
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    },
    strictDeprecations: true,
    output: [
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: '[name].cjs',
        // chunkFileNames: '[name]-[hash].cjs',
        exports: 'named',
        // sourcemap: false,
        preserveModules: !!preserveModules,
        preserveModulesRoot: 'src',
      },
      {
        format: 'esm',
        dir: 'dist',
        entryFileNames: '[name].mjs',
        // chunkFileNames: '[name]-[hash].mjs',
        exports: 'named',
        // sourcemap: false,
        preserveModules: !!preserveModules,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'],
        exportConditions: ['node', 'import', 'require', 'default'],
      }),
      nodeExternals(),

      // Required to tell Rollup where "@/" actually points to
      alias({
        entries: [{ find: '@', replacement: path.resolve(pkgRoot, 'src') }],
      }),

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
  }
}

export function createDtsConfig(customOptions = {}) {
  const {
    pkgRoot = process.cwd(),
  } = customOptions;
  return {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      entryFileNames: '[name].d.ts',
      format: 'es',
    },
    plugins: [
      alias({
        entries: [
          // 确保这里的映射与 tsconfig.json 一致
          { find: '@', replacement: path.resolve(pkgRoot, 'src') },
        ],
      }),
      dts({
        compilerOptions: {
          clean: true,
          removeComments: true,
        },
      }),
    ],
  }
}

export function createFlatConfig() {
  return [
    createDtsConfig(),
    createConfig({
      preserveModules: true,
    }),
  ]
}
