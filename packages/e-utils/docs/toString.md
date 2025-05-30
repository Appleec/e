---
outline: deep
---

# toString

Converts `value` to a string. An empty string is returned for `null`
and `undefined` values. The sign of `-0` is preserved.

## 版本

0.1.2

## 使用

- 语法

```js
toString(value) -> {string}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to convert       |

- 返回值

Returns the converted string.

## 示例

```js
toString(null)
// => ''

toString(-0)
// => '-0'

toString([1, 2, 3])
// => '1,2,3'
```
