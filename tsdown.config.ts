import { defineConfig } from 'tsdown/config';

// const isCi = process.env.CI != null;
const isSourcemap = false;

export const baseConfig = defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  hash: false,
  exports: true,
  // useful for running `build --watch` and `test` concurrently
  clean: !process.argv.includes('--watch'),
  deps: {
    onlyBundle: [], // require explicitly listing inlined dependencies
  },

  sourcemap: isSourcemap,
  dts: { enabled: true, sourcemap: isSourcemap },
  format: ['cjs', 'esm'],
  minify: 'dce-only',
  platform: 'node',

  checks: { pluginTimings: false },
  publint: true,
});

export default defineConfig({
  workspace: ['packages/*'],
});
