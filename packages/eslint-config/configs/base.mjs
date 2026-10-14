import { defineConfig } from './utils.mjs';
import { gitIgnoreFile } from './utils.mjs';
import { jsConfig } from './javascript.mjs';
import { tsConfig } from './typescript.mjs';
import { nodeConfig } from './node.mjs';
import { importConfig } from './import.mjs';

export default defineConfig([
  gitIgnoreFile,
  ...jsConfig,
  ...tsConfig,
  ...nodeConfig,
  ...importConfig,
]);