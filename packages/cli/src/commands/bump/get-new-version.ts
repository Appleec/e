import type { GitCommit } from 'tiny-conventional-commits-parser';
import type { BumpRelease, PromptRelease } from './normalize-options';
import type { Operation } from './operation';
import type { ReleaseType, SemverIncrementType } from './version';
import process from 'node:process';
import pc from 'ansis';
import prompts from 'prompts';
import semver from 'semver';
import { onCancel, onPromptState } from '@/utils/functions';
import { cleanVersion, incrementVersion, isValidVersion, normalizeVersion } from './version';

/**
 * Determines the new version number, possibly by prompting the user for it.
 */
export async function getNewVersion(
  operation: Operation,
  commits: GitCommit[],
): Promise<Operation> {
  const { release } = operation.options;
  const { currentVersion } = operation.state;

  switch (release.type) {
    case 'prompt':
      return promptForNewVersion(operation, commits);

    case 'version':
      return operation.update({
        newVersion: normalizeVersion(release.version)!,
      });

    default:
      return operation.update({
        release: release.type,
        newVersion: getNextVersion(currentVersion, release, commits),
      });
  }
}

/**
 * Returns the next version number of the specified type.
 */
function getNextVersion(currentVersion: string, bump: BumpRelease, commits: GitCommit[]): string {
  let type: SemverIncrementType;
  if (bump.type === 'next') {
    // Bump to the next prerelease if we're already on one, otherwise patch
    type = semver.prerelease(currentVersion)?.length ? 'prerelease' : 'patch';
  } else if (bump.type === 'conventional') {
    type = determineSemverChange(commits);
  } else if (bump.type === 'conventional-prerelease') {
    type = semver.prerelease(currentVersion)?.length
      ? 'prerelease'
      : `pre${determineSemverChange(commits)}`;
  } else {
    type = bump.type;
  }

  return incrementVersion(currentVersion, type, bump.preid)!;
}

/**
 * Recommends a semver change from conventional commits:
 * breaking changes → major, features → minor, otherwise patch.
 */
function determineSemverChange(commits: GitCommit[]): 'major' | 'minor' | 'patch' {
  let [hasMajor, hasMinor] = [false, false];
  for (const commit of commits) {
    if (commit.isBreaking) {
      hasMajor = true;
    } else if (commit.type === 'feat') {
      hasMinor = true;
    }
  }

  return hasMajor ? 'major' : hasMinor ? 'minor' : 'patch';
}

/**
 * Returns the next version number for all release types.
 */
function getNextVersions(
  currentVersion: string,
  preid: string,
  commits: GitCommit[],
): Record<ReleaseType, string> {
  const next: Record<string, string> = {};

  const currentPreid = semver.prerelease(currentVersion)?.[0];
  if (typeof currentPreid === 'string') preid = currentPreid || 'beta';

  for (const type of [
    'major',
    'minor',
    'patch',
    'next',
    'conventional',
    'conventional-prerelease',
    'prepatch',
    'preminor',
    'premajor',
  ]) {
    next[type] = getNextVersion(currentVersion, { type: type as ReleaseType, preid }, commits);
  }

  return next as Record<ReleaseType, string>;
}

/**
 * Prompts the user for the new version number.
 *
 * @returns - A tuple containing the new version number and the release type (if any)
 */
async function promptForNewVersion(operation: Operation, commits: GitCommit[]): Promise<Operation> {
  const { currentVersion } = operation.state;
  const release = operation.options.release as PromptRelease;

  const next = getNextVersions(currentVersion, release.preid, commits);

  const PADDING = 13;
  const answers = (await prompts(
    [
      {
        type: 'autocomplete',
        name: 'release',
        message: `Current version ${pc.green(currentVersion)}`,
        initial: 'next',
        choices: [
          { value: 'major', title: `${'major'.padStart(PADDING, ' ')} ${pc.bold(next.major)}` },
          { value: 'minor', title: `${'minor'.padStart(PADDING, ' ')} ${pc.bold(next.minor)}` },
          { value: 'patch', title: `${'patch'.padStart(PADDING, ' ')} ${pc.bold(next.patch)}` },
          { value: 'next', title: `${'next'.padStart(PADDING, ' ')} ${pc.bold(next.next)}` },
          {
            value: 'conventional',
            title: `${'conventional'.padStart(PADDING, ' ')} ${pc.bold(next.conventional)}`,
          },
          {
            value: 'conventional-prerelease',
            title: `${'conventional'.padStart(PADDING, ' ')} ${pc.bold(next['conventional-prerelease'])}`,
          },
          {
            value: 'prepatch',
            title: `${'pre-patch'.padStart(PADDING, ' ')} ${pc.bold(next.prepatch)}`,
          },
          {
            value: 'preminor',
            title: `${'pre-minor'.padStart(PADDING, ' ')} ${pc.bold(next.preminor)}`,
          },
          {
            value: 'premajor',
            title: `${'pre-major'.padStart(PADDING, ' ')} ${pc.bold(next.premajor)}`,
          },
          { value: 'none', title: `${'as-is'.padStart(PADDING, ' ')} ${pc.bold(currentVersion)}` },
          { value: 'custom', title: 'custom ...'.padStart(PADDING + 4, ' ') },
        ],
        onState: onPromptState,
      },
      {
        type: (prev) => (prev === 'custom' ? 'text' : null),
        name: 'custom',
        message: 'Enter the new version number:',
        initial: currentVersion,
        validate: (custom: string) => {
          return isValidVersion(custom) ? true : "That's not a valid version number";
        },
        onState: onPromptState,
      },
    ],
    { onCancel },
  )) as {
    release: ReleaseType | 'none' | 'custom';
    custom?: string;
  };

  const newVersion =
    answers.release === 'none'
      ? currentVersion
      : answers.release === 'custom'
        ? cleanVersion(answers.custom!)!
        : next[answers.release];

  if (!newVersion) process.exit(1);

  switch (answers.release) {
    case 'custom':
    case 'none':
    case 'next':
    case 'conventional':
      return operation.update({ newVersion });

    default:
      return operation.update({ release: answers.release, newVersion });
  }
}
