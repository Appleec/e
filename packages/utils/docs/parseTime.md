---
outline: deep
---

# parseTime

Parse the time to string.

## 版本

0.2.0

## 使用

- 语法

```js
parseTime(time, format) -> {string|null}
```

- 参数

| Name      | Type                 | Description             |
|-----------|----------------------|-------------------------|
| time      | object,string,number |                         |
| format    | string               | eg: YYYY-MM-DD hh:mm:ss |

- 返回值

Returns the string.

## 示例

```js
var d = new Date('2022-01-01 12:00:00');

parseTime(d);
// => 2022-01-01 12:00:00

parseTime(d, 'YYYY-MM-DD');
// => 2022-01-01

parseTime(d, 'hh:mm:ss');
// => 12:00:00

parseTime();
// => null
```
