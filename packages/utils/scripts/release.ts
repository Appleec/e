import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { exit } from 'node:process';

import prompts from 'prompts';
import c from 'ansis';
import semver, { clean as cleanVersion, valid as isValidVersion, SemVer } from 'semver';

import { DIR_ROOT, run, printStep, printAssets, printCommits } from './utils';

async function main() {
  // Print last commits
  await getLastCommits();

  // Updating the package version
  printStep('Updating the package version');
  const currentVersion = await getCurrentVersion();
  const targetVersion = await getNewVersion(currentVersion);

  if (currentVersion !== targetVersion) updatePackage(targetVersion);
  else exit(1);

  // Build and check the package
  printStep('Checking the package');
  await run('npm', ['run', 'build:types']);

  // Generate the changelog

  // Commit changes to the Git and create a tag
  printStep('Committing changes');
  await getFileChanges();  // Local files change
  await run('git', ['add', '.']);
  await run('git', ['commit', '-m', `chore(release): release v${targetVersion}`]);
  await run('git', [
    'tag',
    '-a',
    `v${targetVersion}`,
    '-m',
    `v${targetVersion}`,
  ]);

  // Merge changes into master branch
  printStep('Merging changes');
  const { stdout: brString } = await run('git', [
    'for-each-ref',
    '--format=%(refname:short)',
    'refs/heads/',
  ], { encoding: 'utf8', stdio: 'pipe' });

  const brList = brString
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  const { bIdx } = await prompts({
    type: 'select',
    name: 'bIdx',
    message: 'Select branch to merge',
    choices: ['none'].concat(brList),
  });

  if (bIdx === 0) return;

  // merge to master
  const branch = brList[bIdx - 1];
  await run('git', ['checkout', 'master']);
  await run('git', ['merge', '--ff-only', branch]);
  await run('git', ['checkout', '-']);

  // Publish the package

  // Push to repo
  printStep('Pushing to repo');
  const { yes: isOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Pushing to repo. Confirm?`,
  });

  if (!isOk)
    return;

  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await run('git', ['push', 'origin', 'master:master']);
}

/**
 * Get new version
 */
async function getNewVersion(currentVersion) {
  const newVersion = await promptForNewVersion(currentVersion);

  return newVersion;
}

/**
 * Get current version
 */
function getCurrentVersion() {
  // @ts-ignore
  const { version: currentVersion } = createRequire(join(DIR_ROOT, '/'))('./package.json');

  return currentVersion;
}

async function promptForNewVersion(currentVersion) {
  // @ts-ignore
  // const { version: currentVersion } = createRequire(DIR_ROOT)('./package.json')
  const next = getNextVersions(currentVersion);

  const PADDING = 13;
  const answers = await prompts([
    {
      type: 'autocomplete',
      name: 'release',
      message: `Current version ${c.green(currentVersion)}`,
      choices: [
        { value: 'major', title: `${'major'.padStart(PADDING, ' ')} ${c.bold(next['major'])}` },
        { value: 'minor', title: `${'minor'.padStart(PADDING, ' ')} ${c.bold(next['minor'])}` },
        { value: 'patch', title: `${'patch'.padStart(PADDING, ' ')} ${c.bold(next['patch'])}` },
        { value: 'next', title: `${'next'.padStart(PADDING, ' ')} ${c.bold(next['next'])}` },
        { value: 'prepatch', title: `${'pre-patch'.padStart(PADDING, ' ')} ${c.bold(next['prepatch'])}` },
        { value: 'preminor', title: `${'pre-minor'.padStart(PADDING, ' ')} ${c.bold(next['preminor'])}` },
        { value: 'premajor', title: `${'pre-major'.padStart(PADDING, ' ')} ${c.bold(next['premajor'])}` },
        { value: 'none', title: `${'as-is'.padStart(PADDING, ' ')} ${c.bold(currentVersion)}` },
        { value: 'custom', title: 'custom ...'.padStart(PADDING + 4, ' ') },
      ],
    },
    {
      type: prev => prev === 'custom' ? 'text' : null,
      name: 'custom',
      message: 'Enter the new version number:',
      initial: currentVersion,
      validate: (custom: string) => isValidVersion(custom) ? true : 'That\'s not a valid version number',
    },
  ]);

  const newVersion = answers.release === 'none'
    ? currentVersion
    : answers.release === 'custom'
      ? cleanVersion(answers.custom!)!
      : next[answers.release];

  if (!newVersion)
    exit(1);

  // if (newVersion === currentVersion)
  //   exit(1)

  switch (answers.release) {
    case 'custom':
    case 'next':
    case 'none':
      return newVersion;
    default:
      return newVersion;
  }
}

/**
 * Returns the next version number for all release types.
 */
function getNextVersions(currentVersion) {
  const next = {};
  const releaseTypes = ['premajor', 'preminor', 'prepatch', 'prerelease', 'major', 'minor', 'patch', 'next'];

  for (const type of releaseTypes)
    next[type] = getNextVersion(currentVersion, { type });

  return next;
}

/**
 * Get files change in local
 */
async function getFileChanges() {
  const { stdout: fString } = await run('git', [
    'ls-files',
    '--exclude-standard',
    '--modified',
    '--others',
  ], { encoding: 'utf8', stdio: 'pipe' });
  const fList = fString
    .trim()
    .split(/\r?\n/)
    .map(f => c.green.underline(f));

  printAssets(fList);
}

/**
 * Get commits since the last version
 */
async function getLastCommits() {
  const { stdout: tagString } = await run('git', ['describe', '--tags', '--abbrev=0'], { encoding: 'utf8', stdio: 'pipe', logger: false });
  const { stdout: logString } = await run('git', [
    '--no-pager',
    'log',
    `${tagString ? `${tagString}...HEAD` : 'HEAD'}`,
    '--pretty=%h|%s|%an|%ae|%ad|%b[GIT_LOG_COMMIT_END]',
  ], { encoding: 'utf8', stdio: 'pipe', logger: false });

  const logList = logString
    .split(/[GIT_LOG_COMMIT_END]\n/)
    .filter(Boolean)
    .map(c => {
      const [shortHash, message] = c.split('|');
      return { shortHash, message };
    })
    .map(ci => {
      const { shortHash, message } = ci;
      return [c.dim(shortHash), '   ', c.green(message)].join('');
    });

  printCommits(logList);
}

/**
 * Returns the next version number of the specified type.
 */
function getNextVersion(currentVersion, options) {
  const oldSemVer = new SemVer(currentVersion);
  const parse = semver.parse(currentVersion);

  if (typeof parse?.prerelease[0] === 'string')
    options.preid = parse?.prerelease[0] || 'preid';

  if (options.type === 'next') {
    options.type = oldSemVer.prerelease.length ? 'prerelease' : 'patch';
  }

  const newSemVer = oldSemVer.inc(options.type, options.preid);

  return newSemVer.version;
}

/**
 * Update package.json version
 * @param version
 */
function updatePackage(version) {
  const pkgPath = resolve(DIR_ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;

  fs.writeFile(resolve(DIR_ROOT, 'package.json'), JSON.stringify(pkg, null, 4) + '\n');
}

main().catch((err) => console.error(err));
