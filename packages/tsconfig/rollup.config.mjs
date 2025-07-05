// import esbuild, { minify } from 'rollup-plugin-esbuild';
// import dts from 'rollup-plugin-dts';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import nodeExternals from 'rollup-plugin-node-externals';
// import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  plugins: [
    copy({
      verbose: false,
      hook: 'closeBundle',
      targets: [
        // {
        //   src: './tsconfig.json',
        //   dest: 'dist'
        // },
        {
          src: './src/*.json',
          dest: './',
          rename: (name, extension, _fullPath) => {
            if (name === 'base')
              return 'tsconfig.json';

            return `tsconfig.${name}.${extension}`;
          },
        },
      ],
    }),
  ],
};

