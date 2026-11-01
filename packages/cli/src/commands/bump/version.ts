import semver from 'semver';

/**
 * The semver release types that can be passed to `semver.inc()`.
 */
export type SemverIncrementType =
  | 'major'
  | 'premajor'
  | 'minor'
  | 'preminor'
  | 'patch'
  | 'prepatch'
  | 'prerelease';

/**
 * The supported release types.
 *
 * - `next` bumps the current version:
 *   - to the next prerelease when already on a prerelease (e.g. `1.0.0-beta.1` → `1.0.0-beta.2`)
 *   - to the next patch otherwise
 * - `conventional` recommends a type from conventional commits since the last tag
 *   (breaking → major, feat → minor, otherwise patch)
 * - `conventional-prerelease` is the `conventional` type as a prerelease
 */
export type ReleaseType = SemverIncrementType | 'next' | 'conventional' | 'conventional-prerelease';

/**
 * The different types of pre-releases.
 */
export const prereleaseTypes: ReleaseType[] = [
  'premajor',
  'preminor',
  'prepatch',
  'prerelease',
  'conventional-prerelease',
];

/**
 * All possible release types.
 */
export const releaseTypes: ReleaseType[] = [
  ...prereleaseTypes,
  'major',
  'minor',
  'patch',
  'next',
  'conventional',
];

/**
 * Determines whether the specified value is a pre-release.
 */
export function isPrerelease(value: unknown): value is ReleaseType {
  return prereleaseTypes.includes(value as ReleaseType);
}

/**
 * Determines whether the specified value is a valid ReleaseType string.
 */
export function isReleaseType(value: unknown): value is ReleaseType {
  return releaseTypes.includes(value as ReleaseType);
}

/**
 * Determines whether the specified value is a valid version number.
 * Accepts an optional leading "v" (e.g. "1.2.3" or "v1.2.3").
 */
export function isValidVersion(version: string): boolean {
  return semver.valid(version) !== null;
}

/**
 * Normalizes a version number (strips the leading "v" and whitespace),
 * or returns `undefined` if it is not a valid version.
 */
export function normalizeVersion(version: string): string | undefined {
  return semver.valid(version) ?? undefined;
}

/**
 * Cleans a version number (strips the leading "v" and whitespace),
 * or returns `undefined` if it is not a valid version.
 */
export function cleanVersion(version: string): string | undefined {
  return semver.clean(version) ?? undefined;
}

/**
 * Increments the current version number by the specified release type.
 *
 * New pre-releases start at `.<preid>.1` (matching bumpp's `identifierBase: 1`
 * behavior) instead of semver's default `.<preid>.0`.
 */
export function incrementVersion(
  currentVersion: string,
  type: SemverIncrementType,
  preid = 'beta',
): string | undefined {
  const next = semver.inc(currentVersion, type, preid) ?? undefined;

  if (next && isPrerelease(type) && next.endsWith('.0')) {
    return `${next.slice(0, -2)}.1`;
  }

  return next;
}
