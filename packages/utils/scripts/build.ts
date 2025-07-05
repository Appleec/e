import { resolve, join } from 'node:path';
import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import c from 'ansis';
import { exec } from '@elinzy/core';
import { printStep, printValues } from './utils';

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR_DIST = resolve(DIR_ROOT, 'dist');

/**
 * main
 */
async function main() {
  console.log('=>', DIR_ROOT);
  console.log('=>', DIR_DIST);
  // Clean
  printStep('Clean up');
  await cleanDist(); // Clean dist directory

  // do something before rollup

  // Rollup
  printStep('Rollup');
  await exec('pnpm', ['run', 'build:rollup'], { logger: true });

  // Generate the `package.json`, `LICENSE`, `README.md`, `README-zh.md`
  printStep('Generate the assets');
  await genAssets();
}

/**
 * Generate files
 */
async function genAssets() {
  const packageJSON = await getPackageJson();

  await fs.writeFile(join(DIR_DIST, 'package.json'), `${JSON.stringify(packageJSON, null, 2)}\n`);
  await fs.copyFile(join(DIR_ROOT, 'LICENSE'), join(DIR_DIST, 'LICENSE'));
  await fs.copyFile(join(DIR_ROOT, 'README.md'), join(DIR_DIST, 'README.md'));
  await fs.copyFile(join(DIR_ROOT, 'README-zh.md'), join(DIR_DIST, 'README-zh.md'));

  printValues([
    resolve(DIR_DIST, 'package.json'),
    resolve(DIR_DIST, 'LICENSE'),
    resolve(DIR_DIST, 'README.md'),
    resolve(DIR_DIST, 'README-zh.md'),
  ], 'files generated');
}

/**
 * Get json from package.json
 */
async function getPackageJson() {
  const packageJSON = JSON.parse(await fs.readFile(join(DIR_ROOT, 'package.json'), { encoding: 'utf8' }));

  packageJSON.scripts = {
    'test': 'echo "Error: no test specified" && exit 1',
  };

  packageJSON.main = './cjs/index.js';
  packageJSON.module = './esm/index.js';
  packageJSON.types = './index.d.ts';
  packageJSON.exports = {
    '.': {
      'import': {
        'types': './index.d.ts',
        'default': './esm/index.js',
      },
      'require': {
        'types': './index.d.ts',
        'default': './cjs/index.js',
      },
    },
    './package.json': './package.json',
  };
  // packageJSON.files = [
  //   "*.d.ts",
  //   "package.json",
  //   "README.md",
  // ]

  delete packageJSON.devDependencies;
  delete packageJSON.publishConfig;
  delete packageJSON.private;
  delete packageJSON.files;

  return packageJSON;
}

/**
 * Clean dist
 */
async function cleanDist() {
  if (!existsSync(DIR_DIST))
    return;

  await fs.rm(DIR_DIST, { recursive: true });

  console.log();
  console.log(c.bold`${c.green(1)} Removed:`);
  console.log();
  console.log([c.green.underline(DIR_DIST)].join('\n'));
  console.log();
}

main().catch((err) => console.error(err));
