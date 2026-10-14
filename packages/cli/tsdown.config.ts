import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  platform: 'node',
  unbundle: true,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
