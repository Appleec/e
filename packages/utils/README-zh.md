# @elinzy/utils

[![NPM Version](https://img.shields.io/npm/v/@elinzy/utils.svg)](https://npmjs.org/package/@elinzy/utils)
[![NPM Downloads](https://img.shields.io/npm/dm/@elinzy/utils.svg)](https://npmjs.org/package/@elinzy/utils)
[![Node.js Version](https://img.shields.io/node/v/@elinzy/utils.svg)](https://nodejs.org/en/download/)

---

[English](./README.md) | [简体中文](./README-zh.md)

## 介绍

`e` 生态的 Lodash 风格工具库 —— 11 大分类、130+ 常用 JavaScript / TypeScript 实用函数。ESM 优先并支持 CJS，完全可 tree-shaking，零运行时依赖。

## 安装

```sh
npm install @elinzy/utils
```

## 用法

命名导入（推荐 —— tree-shaking 更彻底）：

```js
import { isNil, camelCase, kebabCase, debounce } from '@elinzy/utils';

isNil(null); // => true
camelCase('Foo Bar'); // => 'fooBar'
kebabCase('fooBar'); // => 'foo-bar'
```

命名空间导入：

```js
import * as _ from '@elinzy/utils';

_.chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]
_.get({ a: { b: 2 } }, 'a.b'); // => 2
```

CJS：

```js
const _ = require('@elinzy/utils');
```

## API

| 分类 | 数量 | 代表函数 |
| ---- | ---- | -------- |
| `lang` | 52 | `isNil`、`isNull`、`isArray`、`cloneDeep`、`eq`、`gt` |
| `string` | 15 | `camelCase`、`kebabCase`、`capitalize`、`escape`、`parseInt` |
| `util` | 14 | `addCommas`、`base64ToBlob`、`base64ToFile`、`byteSize` |
| `dom` | 12 | `addClass`、`hasClass`、`setStyle`、`getStyle`、`download`、`smoothScrollTo` |
| `math` | 11 | `add`、`subtract`、`multiply`、`divide`、`round`、`sum`、`maxBy` |
| `object` | 9 | `get`、`has`、`keys`、`merge`、`at`、`findKey` |
| `time` | 8 | `formatTime`、`parseTime`、`toDate`、`timestamp`、`isSameDay` |
| `array` | 8 | `chunk`、`compact`、`first`、`last`、`filter`、`indexOf`、`slice` |
| `collection` | 4 | `each`、`reduce`、`countBy`、`orderBy` |
| `function` | 3 | `debounce`、`throttle`、`delay` |
| `number` | 1 | `inRange` |

## 许可证

[MIT](https://github.com/Appleec/e/blob/main/LICENSE)

## 支持

如果您在使用时有任何疑问或遇到任何问题，可以通过社区讨论寻求支持。
