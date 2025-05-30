// rollup.config.mjs
import esbuild, { minify } from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import nodeExternals from 'rollup-plugin-node-externals';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Use `rollup-plugin-esbuild`
// instead of `@rollup/plugin-typescript` and `@rollup/plugin-terser`
// import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';

// Controls
const useCdnBuild = false; //
const useEsbuild = true; // `true` -> use esbuild, `false` use tsc

// Options
const usePreferConst = false; // Use "const" instead of "var"
const usePreserveModules = true; // `true` -> keep modules structure, `false` -> combine everything into a single file
const useStrict = true; // Use "strict"
const useSourceMap = false; // Generate source map files

// https://rollup.nodejs.cn/
// https://rollup.nodejs.cn/configuration-options/
export default () => {
    const config = [
        // .d.ts build
        {
            input: 'src/index.ts',
            output: {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].d.ts',
            },
            plugins: [nodeExternals(), dts()],
        },
        // CJS build
        {
            input: 'src/index.ts',
            output: {
                format: 'cjs',
                dir: 'dist/cjs',
                entryFileNames: '[name].js', // .cjs
                strict: true,
                generatedCode: {
                    constBindings: true,
                },
                preserveModules: true,
                sourcemap: false,
            },
            plugins: [
                nodeResolve(),
                nodeExternals(),
                esbuild(),
                // NOTE: Babel转义，兼容性支持
                babel({
                    presets: ['@babel/preset-env', "@babel/preset-typescript"],
                    babelHelpers: "bundled",
                    exclude:"node_modules/**",
                    extensions: ['.js', '.ts'],
                }),
            ]
        },
        // ESM build
        {
            input: 'src/index.ts',
            output: {
                format: 'es',
                dir: 'dist/esm',
                entryFileNames: '[name].js', // .mjs
                strict: true,
                generatedCode: {
                    constBindings: true,
                },
                preserveModules: true,
                sourcemap: false,
            },
            plugins: [
                nodeExternals(),
                esbuild(),
            ]
        },
    ];

    // CDN build
    if (useCdnBuild) {
        config.push({
            input: 'src/index.ts',
            output: [
                // iife
                {
                    format: 'iife',
                    file: 'dist/cdn/eUtils.min.js',
                    name: 'eUtils',
                    generatedCode: { // es2015
                        constBindings: true,
                    },
                    preserveModules: false,
                    strict: true,
                    sourcemap: false,
                    plugins: [minify()],
                },
                // esm
                {
                    format: 'es',
                    file: 'dist/cdn/eUtils.esm.min.js',
                    name: 'eUtils',
                    generatedCode: {
                        constBindings: true,
                    },
                    preserveModules: false,
                    strict: true,
                    sourcemap: false,
                    plugins: [minify()],
                },
                // umd
                {
                    format: 'umd',
                    file: 'dist/cdn/eUtils.umd.min.js',
                    name: 'eUtils',
                    generatedCode: {
                        constBindings: true,
                    },
                    preserveModules: false,
                    strict: true,
                    sourcemap: false,
                    plugins: [minify()],
                }
            ],
            plugins: [
                nodeResolve(),
                nodeExternals(),
                esbuild(),
                // NOTE: Babel转义，兼容性支持
                babel({
                    presets: ['@babel/preset-env', "@babel/preset-typescript"],
                    babelHelpers: "bundled",
                    exclude:"node_modules/**",
                    extensions: ['.js', '.ts'],
                }),
            ]
        })
    }

    return config;
}
