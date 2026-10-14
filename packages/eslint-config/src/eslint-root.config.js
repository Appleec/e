import { readdirSync } from 'node:fs';

import config from './base.mjs';
import { defineConfig, gitIgnoreFile, globalIgnores, rootPath } from './eslint-utils.js';

const rootFolders = readdirSync(rootPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => `**/${dirent.name}`)
  .filter((folder) => !gitIgnoreFile.ignores.includes(folder));

export default defineConfig([
  {
    ...globalIgnores(rootFolders),
    name: 'e/ignore-everything-except-root-files',
  },
  ...config,
]);