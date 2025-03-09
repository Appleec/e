import prompts from 'prompts'
import fse from 'fs-extra'
import c from 'ansis'
import { createSpinner } from 'nanospinner'
import semver, { clean as cleanVersion, valid as isValidVersion, SemVer } from 'semver'
import * as logger from './utils/logger'
import { releaseTypes, isPrerelease } from './utils/release-type'
import { getManifestConfig, execCommand } from './utils/helper'
import { checkGitStatus, getLastCommits, getLocalChanges, getRefsBranch } from './utils/git'
import { printCommits, printAssets } from './utils/print-log'

export interface ReleaseOptions {
  remote?: string
  defaultBranch?: string
  npmTag?: string
  skipPublish?: boolean
  skipChangelog?: boolean
  skipGitTag?: boolean
  skipCheck?: boolean
  checkRemoteVersion?: boolean
  task?(newVersion: string, oldVersion: string): Promise<void>
}

/**
 * Release
 * @param options
 */
export async function release(options: ReleaseOptions = { remote: 'origin', defaultBranch: 'master' }): Promise<void> {
  const { yes: isOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Releasing the package. Confirm?`
  })

  if (!isOk)
    return

  // Print last commits
  const lastCommits = await getLastCommits()
  printCommits(lastCommits)

  try {
    // Check Current version
    const { version: currentVersion } = getManifestConfig().config
    if (!currentVersion) {
      logger.error('Your package is missing the version field')
      return
    }

    // Check worktree status
    if (options.skipCheck && await checkGitStatus()) {
      logger.error('Git working tree is not clean')
      return
    }

    // Select and Update new version
    const targetVersion = await getNewVersion(currentVersion)
    if (currentVersion !== targetVersion) updatePackageJson(targetVersion)
    else {
      logger.warn('The new version is the same as the current version')
      return
    }

    // Do something when has `task` option
    if (options.task)
      await options.task(targetVersion, currentVersion)

    // Local changes
    const locals = await getLocalChanges()
    printCommits(locals)

    // Commiting
    await confirmCommit(targetVersion)
    // Merging
    await confirmMerge({ ...options })
    // Pushing
    await confirmPush({ version: targetVersion, ...options })

    logger.success(`Release version ${targetVersion} successfully!`)

  } catch (e: any) {
    logger.error(e.toString())
    process.exit(1)
  }
}

/**
 * To Pushing
 */
async function confirmPush({
  version,
  remote = 'origin',
  defaultBranch = 'master',
} : { version: string; remote?: string; defaultBranch?: string }) {
  const {yes: isOk} = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Pushing to repo. Confirm?`
  })

  if (!isOk)
    return

  if (!version)
    return

  const s = createSpinner('Pushing to remote git repository').start()

  await execCommand('git', ['push', remote, `refs/tags/v${version}`])
  await execCommand('git', ['push', remote, `${defaultBranch}:${defaultBranch}`])

  s.success({ text: 'Push remote repository successfully' })
}

/**
 * To Merging
 * @param options
 */
async function confirmMerge(options?: any) {
  const { yes: isOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Merging changes. Confirm?`
  })

  if (!isOk)
    return

  const refs = await getRefsBranch()
  const prefs = refs?.map((r: any) => ({ title: r, value: r })) || []

  const { value: fromBranch, value1: toBranch } = await prompts([
    {
      type: 'select',
      name: 'value',
      message: 'Select merge branch. From?',
      choices: [
        { title: 'none', description: 'Do nothing', value: null },
        { title: 'custom', description: 'Custom', value: 'custom' },
        ...prefs,
      ],
      initial: 0
    },
    {
      type: prev => prev === 'custom' ? 'text' : null,
      name: 'value',
      message: 'Enter custom branch. From',
    },
    {
      type: 'select',
      name: 'value1',
      message: 'Select merge branch. To?',
      choices: [
        { title: 'none', description: 'Do nothing', value: null },
        { title: 'custom', description: 'Custom', value: 'custom' },
        { title: 'master', description: 'Default branch', value: 'master' },
        { title: 'main', description: 'Default branch (version > 2.28)', value: 'main' },
      ],
      initial: 0
    },
    {
      type: prev => prev === 'custom' ? 'text' : null,
      name: 'value1',
      message: 'Enter custom branch. To',
    }
  ])

  if (!fromBranch || !toBranch)
    return

  const { stdout: currentBranch } = await execCommand('git', ['branch', '--show-current'])

  // Checkout main branch
  await execCommand('git', ['checkout', `${toBranch ?? options?.defaultBranch}`].filter(Boolean))
  await execCommand('git', ['merge', '--ff-only', fromBranch ?? currentBranch].filter(Boolean))
  await execCommand('git', ['checkout', '-'])
}

/**
 * To Commit
 * @param version
 */
async function confirmCommit(version: string): Promise<void> {
  const { yes: isOk, msg } = await prompts([
    {
      type: 'confirm',
      name: 'yes',
      message: `Commiting changes. Confirm?`
    },
    {
      type: prev => prev ? 'text' : null,
      name: 'msg',
      message: 'Enter commit message',
      initial: version ? `chore(release): release v${version}` : ''
    }
  ])

  if (!isOk || !msg)
    return

  await execCommand('git', ['add', '.'], { logger: true })
  await execCommand('git', ['commit', '-m', `${msg}`], { logger: true })
  await execCommand('git', [
    'tag',
    '-a',
    `v${version}`,
    '-m',
    `v${version}`,
  ], { logger: true })
}

/**
 * Update (package.json).version
 * @param version
 */
function updatePackageJson(version: string) {
  const { filePath, config } = getManifestConfig()
  config.version = version

  fse.writeFileSync(filePath, JSON.stringify(config, null, 2))
}

/**
 * Get new version from prompts
 * @param currentVersion
 */
async function getNewVersion(currentVersion: string) {
  const next = getNextVersions(currentVersion)

  const PADDING = 13
  const answers = await prompts([
    {
      type: 'autocomplete',
      name: 'release',
      message: `Current version ${c.green(currentVersion)}`,
      choices: [
        {value: 'major', title: `${'major'.padStart(PADDING, ' ')} ${c.bold(next['major'])}`},
        {value: 'minor', title: `${'minor'.padStart(PADDING, ' ')} ${c.bold(next['minor'])}`},
        {value: 'patch', title: `${'patch'.padStart(PADDING, ' ')} ${c.bold(next['patch'])}`},
        {value: 'next', title: `${'next'.padStart(PADDING, ' ')} ${c.bold(next['next'])}`},
        {value: 'prepatch', title: `${'pre-patch'.padStart(PADDING, ' ')} ${c.bold(next['prepatch'])}`},
        {value: 'preminor', title: `${'pre-minor'.padStart(PADDING, ' ')} ${c.bold(next['preminor'])}`},
        {value: 'premajor', title: `${'pre-major'.padStart(PADDING, ' ')} ${c.bold(next['premajor'])}`},
        {value: 'none', title: `${'as-is'.padStart(PADDING, ' ')} ${c.bold(currentVersion)}`},
        {value: 'custom', title: 'custom ...'.padStart(PADDING + 4, ' ')},
      ]
    },
    {
      type: prev => prev === 'custom' ? 'text' : null,
      name: 'custom',
      message: 'Enter the new version number:',
      initial: currentVersion,
      validate: (custom: string) => {
        return isValidVersion(custom) ? true : 'That\'s not a valid version number'
      },
    },
  ])

  const newVersion = answers.release === 'none'
    ? currentVersion
    : answers.release === 'custom'
      ? cleanVersion(answers.custom!)!
      : next[answers.release]

  if (!newVersion)
    return

  return newVersion
}

/**
 * Returns the next version number for all release types.
 */
function getNextVersions(currentVersion: string)  {
  const next: Record<any, any> = {}

  for (const type of releaseTypes) {
    next[type] = getNextVersion(currentVersion, { type })
  }

  return next
}

/**
 * Returns the next version number of the specified type.
 */
function getNextVersion(currentVersion: string, options: any) {
  const oldSemVer = new SemVer(currentVersion)
  const parse = semver.parse(currentVersion)

  if (typeof parse?.prerelease[0] === 'string')
    options.preid = parse?.prerelease[0] || 'preid'

  if (options.type === 'next') {
    options.type = oldSemVer.prerelease.length ? 'prerelease' : 'patch'
  }

  const newSemVer = oldSemVer.inc(options.type, options.preid)

  if (
    isPrerelease(options.type)
    && newSemVer.prerelease.length === 2
    && newSemVer.prerelease[0] === options.preid
    && String(newSemVer.prerelease[1]) === '0'
  ) {
    // This is a special case when going from a non-prerelease version to a prerelease version.
    // SemVer sets the prerelease version to zero (e.g. "1.23.456" => "1.23.456-beta.0").
    // But the user probably expected it to be "1.23.456-beta.1" instead.
    //// @ts-expect-error - TypeScript thinks this array is read-only
    newSemVer.prerelease[1] = '1'
    newSemVer.format()
  }

  return newSemVer.version
}
