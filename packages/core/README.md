# @elinzy/core

Node.js runtime primitives for the `e` CLI: process execution built on [execa](https://github.com/sindresorhus/execa), with command logging, dry-run and abbreviated output support.

## Install

```shell
npm install @elinzy/core
```

## Usage

- ESM

```js
import { exec, execSync, execCommand, execCommandSync } from '@elinzy/core';

// Asynchronous, array-style (like execa)
const result = await exec('git', ['status']);
console.log(result.stdout);

// Synchronous, string-style
const version = execCommandSync('node -v', { abbrev: true });

// Dry run: log the command, skip execution
await exec('rm', ['-rf', 'dist'], { dryRun: true });
```

- CJS

```js
const { execSync } = require('@elinzy/core');

const stdout = execSync('node', ['-v'], { abbrev: true });
```

## API

### exec(cmd, args, opts?)

Execute a command asynchronously. Returns the execa result promise.

### execSync(cmd, args, opts?)

Execute a command synchronously. Returns the execa result.

### execCommand(cmd, opts?)

Execute a command string asynchronously (`'git status'` style). Returns the execa result promise.

### execCommandSync(cmd, opts?)

Execute a command string synchronously. Returns the execa result.

#### cmd

- Type: `String`

#### args

- Type: `String[]`

#### opts

- Type: `Object`
- All [execa options](https://github.com/sindresorhus/execa/blob/main/docs/execution.md#options-1) are passed through (`cwd`, `env`, `stdio`, ...), plus:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `abbrev` | `Boolean` | `false` | Return only `stdout` instead of the full result |
| `logger` | `Boolean` | `false` | Print the command before executing it |
| `dryRun` | `Boolean` | `false` | Print the command but skip execution |
| `throwOnError` | `Boolean` | `true` | Throw a colored error including `stderr` / stack on failure; when `false`, failures resolve to `undefined` |

## License

[MIT](https://github.com/Appleec/e/blob/main/packages/core/LICENSE)

## Related

- [`@elinzy/logger`](https://github.com/Appleec/e/tree/main/packages/logger) — styled terminal logging
- [`@elinzy/git`](https://github.com/Appleec/e/tree/main/packages/git) — git operations built on this package
- [`e`](https://github.com/Appleec/e) — the monorepo root
