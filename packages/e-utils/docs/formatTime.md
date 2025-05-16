---
outline: deep
---

# formatTime

Format time，Upgrade from `parseTime()` method.

eg.
[date-fns](https://github.com/date-fns/date-fns/blob/main/src/format/index.ts)
[moment](https://github.com/moment/moment/blob/develop/src/lib/format/format.js)
[dayjs](https://github.com/iamkun/dayjs/blob/dev/src/index.js)

## 版本

0.2.0

## 使用

- 语法

```js
formatTime(value, format) -> {string|null}
```

- 参数

| Name      | Type                 | Description             |
|-----------|----------------------|-------------------------|
| value      | object,string,number |                         |
| format    | string               | eg: YYYY-MM-DD hh:mm:ss |

- 返回值

Returns the `Date` string.

## 示例

```js
var d = new Date('2022-01-01 12:00:00');

formatTime(d);
// => 2022-01-01 12:00:00

formatTime(d, 'YYYY-MM-DD');
// => 2022-01-01

formatTime(d, 'YYYYMMD');
// => 20220101

formatTime(d, 'hh:mm:ss');
// => 12:00:00

formatTime();
// => null
```
