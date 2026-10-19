# @elinzy/git

Git operations wrapper for the `e` CLI: repo inspection, branches, tags and changed files, built on [`@elinzy/core`](https://github.com/Appleec/e/tree/main/packages/core).

## Requirements

A `git` binary must be installed and available in `PATH`. All functions shell out to `git`, so they fail (or return fallback values) without it. Pre-check with `isGitInstalled()` when targeting environments where Git may be missing.

## Install

```shell
npm install @elinzy/git
```

## Usage

- ESM

```js
import {
  isGitInstalled,
  getGitVersion,
  getCurrentBranch,
  getChangedFilesSinceLastTag,
} from '@elinzy/git';

if (!isGitInstalled()) {
  throw new Error('Git is required. Install it from https://git-scm.com/downloads');
}

getGitVersion(); // => '2.39.2'
getCurrentBranch(); // => 'main'
getChangedFilesSinceLastTag(); // => ['packages/git/src/index.ts', ...]
```

- CJS

```js
const { isGitRepo, getRepoRoot } = require('@elinzy/git');

if (isGitRepo()) {
  console.log(getRepoRoot()); // => '/path/to/repo'
}
```

## API

### Repo

#### isGitInstalled()

Returns `true` if the `git` binary is available in `PATH`. Safe to call anywhere — never throws.

#### getGitVersion()

Returns the Git client version as a string (`'2.39.2'`), or `undefined` when Git is not installed.

#### isGitRepo()

Returns `true` if the current working directory is inside a Git repository.

#### getRepoRoot(opts?)

Returns the absolute path of the repository root. Accepts `{ cwd }`.

#### isDetachedWithHead()

Returns `true` if `HEAD` is detached.

#### isExistRemote()

Returns `true` if an upstream remote is configured.

#### isCleanWithWorkingTree()

Returns `true` if the working tree has no uncommitted changes.

#### isCleanWithRemoteHistory()

Returns `true` if the local branch has no commits ahead of its upstream.

#### isChangedWithFetchRemote()

Returns `true` if the remote has unfetched changes (`git fetch --dry-run` produces output).

### Branch

#### getCurrentBranch()

Returns the current branch name.

#### isExistBranch(value, opts?)

Returns `true` if the local branch exists. Defaults to `'main'`.

#### getDefaultBranch()

Returns the first existing branch among `main`, `master`, `gh-pages`. Throws if none exists.

### Tag

#### getCurrentTag()

Returns the tags pointing at `HEAD` as an array.

#### getLastTag()

Returns the closest tag to `HEAD` on the current branch.

#### getTags()

Returns all local tags, sorted by creation date in ascending order.

#### isExistTagWithRemote(value, opts?)

Returns `true` if the tag exists.

### Changed

#### getCurrentCommitId(options?)

Returns the current commit hash. Pass `{ short: true }` for the abbreviated form.

#### getFirstCommitHash()

Returns the hash of the first commit.

#### getChangedFilesSinceLastTag(opts?)

Returns files added since the last tag. Pass `{ fullPath: true }` to resolve paths against the repository root, and `{ cwd }` to run in another directory.

## License

[MIT](https://github.com/Appleec/e/blob/main/packages/git/LICENSE)

## Related

- [`@elinzy/core`](https://github.com/Appleec/e/tree/main/packages/core) — process execution this package builds on
- [`@elinzy/logger`](https://github.com/Appleec/e/tree/main/packages/logger) — styled terminal logging
- [`e`](https://github.com/Appleec/e) — the monorepo root
