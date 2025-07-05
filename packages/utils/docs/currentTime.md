---
outline: deep
---

# currentTime

Get current time.

## 版本

0.2.0

## 使用

- 语法

```js
currentTime(format) -> {string|null}
```

- 参数

| Name      | Type                 | Required | Description             |
|-----------|----------------------|----------|-------------------------|
| format    | string               | N        | eg: YYYY-MM-DD hh:mm:ss |

- 返回值

Returns the string.

## 示例

```js
currentTime();
// => 2022-04-18 13:53:24

currentTime('YYYY-MM-DD');
// => 2022-04-18
```
