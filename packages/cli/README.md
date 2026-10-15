# @elinzy/cli

A general-purpose CLI toolkit for the `@elinzy/e` ecosystem.

## Installation

```shell
# Project dependency
npm install -D @elinzy/cli

# Global
npm install -g @elinzy/cli
```

## Commands

### `e eslint`

Interactive ESLint config scaffolding. Generates an `eslint.config.mjs` with `@elinzy/eslint-config-extended` presets.

```shell
e eslint
```

The wizard will guide you through:

1. Config type — Extended (flat config) or Legacy (.eslintrc compat)
2. Language — TypeScript or JavaScript
3. Formatter — Prettier or none
4. Runtime — Node.js / React / Next.js
5. Strict configs — Import / React / TypeScript
6. Create file — writes `eslint.config.mjs` to current directory
7. Skip install — optionally skip `pnpm add` for dependencies

### `e --help`

```shell
e --help       # Show all commands
e eslint --help # Show eslint subcommand options
```

## License

[MIT](https://github.com/Appleec/e/blob/main/LICENSE)