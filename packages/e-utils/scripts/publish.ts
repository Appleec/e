import fs from "node:fs/promises"
import { join, resolve} from 'node:path'

import { DIR_ROOT, DIR_DIST, run, printStep, printAssets } from './utils'
import { version } from '../package.json';

/**
 * main
 */
async function main() {
  // Check before build
  printStep('Check before build')
  await run('npm', ['run', 'build:types'])

  // Build the package
  printStep('Building the package')
  await run('npm', ['run', 'build'])

  // Generate the `package.json`, `LICENSE`, `README.md`, `README-zh.md`
  printStep('Generate the assets')
  await genAssets()

  // Publishing the package
  printStep('Publishing the package')
  await run('npm', [
    'publish',
    '-r',
    '--access',
    'public',
    '--registry',
    'https://registry.npmjs.org/',
    '--ignore-scripts',
    '--no-git-checks',
    version.includes('beta') && '--tag beta',
  ].filter(Boolean), { cwd: DIR_DIST })
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

  printAssets([
    resolve(DIR_DIST, 'package.json'),
    resolve(DIR_DIST, 'LICENSE'),
    resolve(DIR_DIST, 'README.md'),
    resolve(DIR_DIST, 'README-zh.md'),
  ], 'files generated')
}

/**
 * Get json from package.json
 */
async function getPackageJson() {
  const packageJSON = JSON.parse(await fs.readFile(join(DIR_ROOT, 'package.json'), { encoding: 'utf8' }));

  packageJSON.scripts = {
    "test": "echo \"Error: no test specified\" && exit 1"
  };

  packageJSON.main = "./cjs/index.js";
  packageJSON.module = "./esm/index.js";
  packageJSON.types = "./index.d.ts";
  packageJSON.exports = {
    ".": {
      "import": {
        "types": "./index.d.ts",
        "default": "./esm/index.js"
      },
      "require": {
        "types": "./index.d.ts",
        "default": "./cjs/index.js"
      }
    },
    "./package.json": "./package.json"
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

main().catch((err) => console.error(err))
