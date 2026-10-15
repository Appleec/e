import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const { watch } = options;
  return {
    entry: ['src/index.ts'],
    dts: true,
    format: 'esm',
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    minify: false,
    nodeProtocol: true,
    unbundle: true
  };
});
