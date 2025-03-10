import { defineBuildConfig } from 'unbuild'

// https://github.com/unjs/unbuild
// https://rollupjs.org/configuration-options/
export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'dist',
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: true,
    },
  },
})