---
outline: deep
---

# isBoolean

Checks if `value` is classified as a boolean primitive or object.

## 版本

0.1.1

## 使用

- 语法

```js
isBoolean(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a boolean, else `false`.

## 示例

```js
isBoolean(false)
// => true

isBoolean(null)
// => false
```
