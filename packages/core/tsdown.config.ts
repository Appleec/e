import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/child_process.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  platform: 'node',
  clean: true,
  deps: {
    neverBundle: [/^[^./]/],
  },
});