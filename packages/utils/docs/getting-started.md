# 快速开始

## 概述

e 工具类，常见 JavaScript / TypeScript 实用程序合集

主要借鉴&参考，包括第三方库：

- [lodash](https://github.com/lodash/lodash)
- [radash](https://github.com/sodiray/radash)
- [i-utils](https://github.com/qq575792372/i-utils)
- [es-toolkit](https://github.com/toss/es-toolkit)

## 安装

::: code-group

```sh [npm]
npm install -D @elinzy/e-utils
```

```sh [yarn]
yarn add -D @elinzy/e-utils
```
:::

## 用法

:::code-group

```js [ESM]
import * as _ from '@elinzy/e-utils';

_.isNil();
_.isNull();
```

```js [CommonJs]
const _ = require('@elinzy/e-utils');

_.isNil();
_.isNull();
```
:::
