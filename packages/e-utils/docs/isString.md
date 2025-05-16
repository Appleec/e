---
outline: deep
---

# isString

Checks if `value` is classified as a `String` primitive or object.

## 版本

0.1.1

## 使用

- 语法

```js
isString(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a string, else `false`.

## 示例

```js
isString('abc')
// => true

isString(1)
// => false
```
