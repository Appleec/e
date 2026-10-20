import { defineConfig } from 'tsdown/config';
import { baseConfig } from '../../tsdown.config.ts';

export default defineConfig({
  ...baseConfig,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  exports: true,
  nodeProtocol: true,
  unbundle: true,
});
