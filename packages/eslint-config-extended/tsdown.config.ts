import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/legacy.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  platform: 'node',
  unbundle: true,
  clean: true,
  nodeProtocol: true,
});
