import { defineConfig } from 'tsdown/config';
import { baseConfig } from '../../tsdown.config.ts';

export default defineConfig((options) => {
  const { watch } = options;
  return {
    ...baseConfig,
    entry: ['src/index.ts', 'src/legacy.ts'],
    format: 'esm',
    treeshake: !watch,
    minify: false,
    exports: true,
    nodeProtocol: true,
    unbundle: true,
  };
});
