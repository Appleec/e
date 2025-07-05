# @elinzy/e-tsconfig

TypeScript configuration for e

## Installation

```shell
npm install -D @elinzy/e-tsconfig typescript
```

## Usage

Create the following `tsconfig.json` file:

### Base (Runtime-agnostic)

```json
{
  "extends": "@elinzy/tsconfig"
}
```
or,

```json
{
  "extends": "@elinzy/tsconfig/tsconfig.json"
}
```

### Browser Environment

```json
{
  "extends": "@elinzy/tsconfig/tsconfig.dom.json"
}
```

### Lib

```json
{
  "extends": "@elinzy/tsconfig/tsconfig.lib.json"
}
```

### Recommended

```json
{
  "extends": "@elinzy/tsconfig/tsconfig.recommended.json"
}
```

## License

[MIT]()