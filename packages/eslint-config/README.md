# @elinzy/e-eslint-config

- https://eslint.org/docs
- https://eslint.nodejs.cn/docs

## Installation

Peer dependencies installation:

```shell
npm install -D eslint
```

Config installation:

```shell
npm install -D @elinzy/eslint-config
```

> **Requirements**  
> ESLint v8.44.0 and above  
> Node.js v18.x, v20.x and above

## Usage

- Flat Configuration (ECMAScript Modules):

```ts
// eslint.config.mjs
import eslintConfig from '@elinzy/eslint-config';

export default [
    ...eslintConfig.configs.flat.base.recommended,
    ...eslintConfig.configs.flat.node.recommended,
    ...eslintConfig.configs.flat.base.typescript,
]
```

**Plugins:** 

```sh
# base
- `eslint-plugin-import-x`
- `eslint-plugin-n`
# typescript
- `eslint-import-resolver-typescript`
- `typescript-eslint`
```

- Eslintrc Configuration (CommonJS)

```ts
// eslint.config.js or .eslintrc
module.exports = {
    extends: [
        '@elinzy/eslint-config/eslintrc/base/recommended',
        '@elinzy/eslint-config/eslintrc/base/typescript',
    ]
}
```

**Plugins:**

```sh
# base
- `eslint-plugin-import`
- `eslint-plugin-node`
# typescript
- `eslint-import-resolver-typescript`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
```

Learn how to configure [ESLint](https://eslint.org/docs/latest/use/configure/).

## License

[MIT]()