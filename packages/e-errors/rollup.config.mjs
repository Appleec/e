import esbuild, { minify } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'
import babel from '@rollup/plugin-babel'

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
                }
            })
        ],
    },
    {
        input: ['src/index.ts'],
        output: {
            format: 'cjs',
            dir: 'dist',
            entryFileNames: '[name].cjs',
            exports: 'named',
            preserveModules: false,
            sourcemap: false,
        },
        plugins: [
            nodeResolve(),
            nodeExternals(),
            esbuild(),
            babel({
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                babelHelpers: "bundled",
                exclude:"node_modules/**",
                extensions: ['.js', '.ts'],
            }),
            // minify(),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            format: 'es',
            dir: 'dist',
            entryFileNames: '[name].mjs',
            exports: 'named',
            preserveModules: false,
            sourcemap: false,
        },
        plugins: [
            nodeResolve(),
            nodeExternals(),
            esbuild(),
            // minify(),
        ]
    },
]
