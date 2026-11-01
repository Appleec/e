import type { ReleaseType } from './version';

export type VersionNumber = `${number}` | `${number}${string}`;
export type VersionBumpRelease = ReleaseType | 'prompt' | VersionNumber | `v${VersionNumber}`;

/**
 * Options for the `versionBump()` function.
 */
export interface VersionBumpOptions {
  /**
   * The release version or type. Can be one of the following:
   *
   * - The new version number (e.g. "1.23.456")
   * - A release type (e.g. "major", "minor", "patch", "prerelease", etc.)
   * - "prompt" to prompt the user for the version number
   *
   * Defaults to "prompt".
   */
  release?: VersionBumpRelease;

  /**
   * The current version number to be bumped.
   * If not provided, it will be read from the first file in the `files` array.
   */
  currentVersion?: string;

  /**
   * The prerelease type (e.g. "alpha", "beta", "next").
   *
   * Defaults to "beta".
   */
  preid?: string;

  /**
   * Indicates whether to create a git commit. Can be set to a custom commit message string
   * or `true` to use "chore: release v". Any `{version}` tokens in the message string will
   * be replaced with the new version number. If the message string does _not_ contain any
   * tokens, then the new version number will be appended to the message.
   *
   * Defaults to `true`.
   */
  commit?: boolean | string;

  /**
   * Indicates whether to tag the git commit. Can be set to a custom tag string
   * or `true` to use "v".
   *
   * Defaults to `true`.
   */
  tag?: boolean | string;

  /**
   * Sign the git commit and tag with a configured key (GPG/SSH).
   *
   * Defaults to `false`.
   */
  sign?: boolean;

  /**
   * Indicates whether to push the git commit and tag.
   *
   * Defaults to `true`.
   */
  push?: boolean;

  /**
   * Indicates whether the git commit should include ALL files (`git commit --all`)
   * rather than just the files that were modified by `versionBump()`.
   *
   * Defaults to `false`.
   */
  all?: boolean;

  /**
   * Prompt for confirmation.
   *
   * @default true
   */
  confirm?: boolean;

  /**
   * Indicates whether to bypass git commit hooks (`git commit --no-verify`).
   *
   * Defaults to `false`.
   */
  noVerify?: boolean;

  /**
   * The files to be updated. For certain known files ("package.json", "bower.json", etc.)
   * `versionBump()` will explicitly update the file's version number. For other files
   * (ReadMe files, config files, source code, etc.) it will simply do a global replacement
   * of the old version number with the new version number.
   *
   * Defaults to ["package.json", "package-lock.json", "jsr.json", "jsr.jsonc", "deno.json", "deno.jsonc"].
   */
  files?: string[];

  /**
   * The working directory, which is used as the basis for locating all files.
   *
   * Defaults to `process.cwd()`
   */
  cwd?: string;

  /**
   * Indicates whether to ignore version scripts.
   *
   * Defaults to `false`.
   */
  ignoreScripts?: boolean;

  /**
   * Bump the files recursively for monorepo. Only works without `files` option.
   *
   * Defaults to `false`.
   */
  recursive?: boolean;

  /**
   * Print recent commits since the last version.
   *
   * Defaults to `true`.
   */
  printCommits?: boolean;

  /**
   * Execute additional command after bumping and before committing.
   */
  execute?: string;

  /**
   * Run package manager install after bumping the version number.
   *
   * Defaults to `false`.
   */
  install?: boolean;

  /**
   * A callback that provides information about the progress of the `versionBump()` function.
   */
  progress?: (progress: VersionBumpProgress) => void;
}

/**
 * Progress events that indicate the progress of the `versionBump()` function.
 */
export const ProgressEvent = {
  FileUpdated: 'file updated',
  FileSkipped: 'file skipped',
  GitCommit: 'git commit',
  GitTag: 'git tag',
  GitPush: 'git push',
  NpmScript: 'npm script',
} as const;

export type ProgressEvent = (typeof ProgressEvent)[keyof typeof ProgressEvent];

/**
 * The NPM version scripts
 *
 * @see https://docs.npmjs.com/cli/version.html
 */
export const NpmScript = {
  PreVersion: 'preversion',
  Version: 'version',
  PostVersion: 'postversion',
} as const;

export type NpmScript = (typeof NpmScript)[keyof typeof NpmScript];

/**
 * Information about the work that was performed by the `versionBump()` function.
 */
export interface VersionBumpResults {
  /**
   * The release type that was used, or `undefined` if an explicit version number was used.
   */
  release?: ReleaseType;

  /**
   * The previous version number in package.json.
   */
  currentVersion: string;

  /**
   * The new version number.
   */
  newVersion: string;

  /**
   * The commit message that was used for the git commit, or `false` if no git commit was created.
   */
  commit: string | false;

  /**
   * The tag name that was used for the git tag, or `false` if no git tag was created.
   */
  tag: string | false;

  /**
   * The files that were actually modified.
   */
  updatedFiles: string[];

  /**
   * The files that were not updated because they did not contain the old version number.
   */
  skippedFiles: string[];
}

/**
 * Information about the progress of the `versionBump()` function.
 */
export interface VersionBumpProgress extends VersionBumpResults {
  event: ProgressEvent;
  script?: NpmScript;
}
