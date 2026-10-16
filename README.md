# @elinzy/e

A collection of TypeScript / JavaScript modules and tools for multi-package repositories.

[![npm package](https://img.shields.io/npm/v/@elinzy/cli?label=%40elinzy%2Fcli)](https://npmjs.com/package/@elinzy/cli)

---

## Installation

```shell
# CLI toolkit
npm install -D @elinzy/cli

# ESLint extended config
npm install -D @elinzy/eslint-config-extended
```

## Quick Start

```shell
# Interactive ESLint config scaffold
npx e eslint
```

## Packages

### Runtime

| Package | Description |
|---------|-------------|
| [`@elinzy/cli`](packages/cli) | CLI toolkit with `e eslint` interactive scaffold |
| [`@elinzy/core`](packages/core) | Process execution, file operations, terminal output |
| [`@elinzy/errors`](packages/errors) | Custom error classes (GitError, ValidationError, etc.) |
| [`@elinzy/git`](packages/git) | Git operations wrapper (repo, branch, tag, changed) |
| [`@elinzy/logger`](packages/logger) | Styled terminal logging with colors and symbols |
| [`@elinzy/types`](packages/types) | Shared TypeScript type definitions |
| [`@elinzy/utils`](packages/utils) | Lodash-style utility library (170+ functions) |

### Config

| Package | Description |
|---------|-------------|
| [`@elinzy/eslint-config-extended`](packages/eslint-config-extended) | ESLint flat config with TypeScript, React, Next.js support |
| [`@elinzy/tsconfig`](packages/tsconfig) | Shared TypeScript configuration presets |
| [`@elinzy/build-templates`](packages/build-templates) | Pre-generated ESLint config templates for the CLI |

## License

[MIT](https://github.com/Appleec/e/blob/main/LICENSE)