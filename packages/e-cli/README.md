# e-cli

## Introduction

`e-cli` is a command line tool. It includes release, publish and changelog commands, and more new functions will be added in the future.

## Installation

```shell
npm install -D @elinz/e-cli
```

or, globals

```shell
npm install -g @elinzy/e-cli
```

## Usage

```shell
# Just generate changelogs
npx e changelog
```

## Configuration

- changelog

| Name         | Arguments                               | Type   | Default          | Description                                                                           |
|--------------|-----------------------------------------|--------|------------------|---------------------------------------------------------------------------------------|
| file         | -f --file <file>                        | string | `CHANGELOG.md`   | Specify changelog filename                                                            |
| releaseCount | -n --releaseCount <releaseCount>        | number | `0`              | Release count                                                                         |
| preset       | -p --preset <preset>                    | string | `angular`        | Specify changelog preset. Example: `angular, atom, codemirror, conventionalcommits`   |

## License

[MIT](https://github.com/Appleec/e-cli/blob/main/LICENSE)

## References

- [release-it](https://github.com/release-it/release-it)