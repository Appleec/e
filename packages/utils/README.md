# @elinzy/utils

[![NPM Version](https://img.shields.io/npm/v/@elinzy/utils.svg)](https://npmjs.org/package/@elinzy/utils)
[![NPM Downloads](https://img.shields.io/npm/dm/@elinzy/utils.svg)](https://npmjs.org/package/@elinzy/utils)
[![Node.js Version](https://img.shields.io/node/v/@elinzy/utils.svg)](https://nodejs.org/en/download/)

---

[English](./README.md) | [简体中文](./README-zh.md)

## Introduction

Lodash-style utility library for the `e` ecosystem — 130+ common JavaScript / TypeScript utilities across 11 categories. ESM-first with CJS support, fully tree-shakable, zero runtime dependencies.

## Installation

```sh
npm install @elinzy/utils
```

## Usage

Named imports (recommended — tree-shakes cleanly):

```js
import { isNil, camelCase, kebabCase, debounce } from '@elinzy/utils';

isNil(null); // => true
camelCase('Foo Bar'); // => 'fooBar'
kebabCase('fooBar'); // => 'foo-bar'
```

Namespace import:

```js
import * as _ from '@elinzy/utils';

_.chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]
_.get({ a: { b: 2 } }, 'a.b'); // => 2
```

CJS:

```js
const _ = require('@elinzy/utils');
```

## API

| Category | Count | Representative functions |
| -------- | ----- | ------------------------ |
| `lang` | 52 | `isNil`, `isNull`, `isArray`, `cloneDeep`, `eq`, `gt` |
| `string` | 15 | `camelCase`, `kebabCase`, `capitalize`, `escape`, `parseInt` |
| `util` | 14 | `addCommas`, `base64ToBlob`, `base64ToFile`, `byteSize` |
| `dom` | 12 | `addClass`, `hasClass`, `setStyle`, `getStyle`, `download`, `smoothScrollTo` |
| `math` | 11 | `add`, `subtract`, `multiply`, `divide`, `round`, `sum`, `maxBy` |
| `object` | 9 | `get`, `has`, `keys`, `merge`, `at`, `findKey` |
| `time` | 8 | `formatTime`, `parseTime`, `toDate`, `timestamp`, `isSameDay` |
| `array` | 8 | `chunk`, `compact`, `first`, `last`, `filter`, `indexOf`, `slice` |
| `collection` | 4 | `each`, `reduce`, `countBy`, `orderBy` |
| `function` | 3 | `debounce`, `throttle`, `delay` |
| `number` | 1 | `inRange` |

## License

[MIT](https://github.com/Appleec/e/blob/main/LICENSE)

## Support

If you have any questions or encounter any problems while using tools, you can use the community discussions for support.
