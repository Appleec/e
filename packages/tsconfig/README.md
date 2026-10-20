# @elinzy/tsconfig

TypeScript configuration presets for the `e` ecosystem — base defaults plus ready-made presets for frameworks, Node versions and strictness levels.

## Installation

```shell
npm install -D @elinzy/tsconfig typescript
```

## Usage

Create a `tsconfig.json` that extends a preset:

```json
{
  "extends": "@elinzy/tsconfig"
}
```

Or reference a specific preset file:

```json
{
  "extends": "@elinzy/tsconfig/tsconfig.node.json"
}
```

Presets can be composed — later entries override earlier ones:

```json
{
  "extends": [
    "@elinzy/tsconfig/tsconfig.vue.json",
    "@elinzy/tsconfig/tsconfig.strictest.json"
  ]
}
```

## Presets

### Base

| Preset | Description |
| ------ | ----------- |
| `tsconfig.json` | Default entry (`extends: "@elinzy/tsconfig"`), general-purpose ESNext defaults |
| `base.json` | Fully annotated `tsconfig` reference with every option explained |

### Frameworks

| Preset | Description |
| ------ | ----------- |
| `vue.json` | Vue 3 projects (`jsx: preserve`, Vite-friendly) |
| `nuxt.json` | Nuxt projects |
| `next.json` | Next.js projects |
| `svelte.json` | Svelte projects |
| `taro.json` | Taro projects |
| `ember.json` | Ember projects |
| `react-native.json` | React Native projects |
| `vite-react.json` | Vite + React projects |
| `dom.json` | Browser/DOM environments |

### Node & Runtimes

| Preset | Description |
| ------ | ----------- |
| `node.json` | Node.js projects (ESM recommended) |
| `node-ts.json` | Node executed directly from TypeScript (TS ≥ 5.8, `erasableSyntaxOnly`) |
| `node10.json` … `node24.json` | Version-specific Node module resolution |
| `bun.json` | Bun runtime |

### Strictness

| Preset | Description |
| ------ | ----------- |
| `recommended.json` | Recommended balanced rules |
| `strictest.json` | Maximum strictness (`exactOptionalPropertyTypes`, `noImplicitOverride`, ...) |

### Library & Testing

| Preset | Description |
| ------ | ----------- |
| `lib.json` | Library authoring (`emitDeclarationOnly`, stricter type accuracy) |
| `cypress.json` | Cypress end-to-end tests |

### Internal

| Preset | Description |
| ------ | ----------- |
| `e.json` | Preset for the `e` monorepo packages themselves |

## License

[MIT](https://github.com/Appleec/e/blob/main/LICENSE)

## Related

- [`e`](https://github.com/Appleec/e) — the monorepo root
