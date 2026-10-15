import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const { watch } = options;
  return {
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    minify: false,
    exports: true,
    nodeProtocol: true,
    unbundle: true
  };
});
