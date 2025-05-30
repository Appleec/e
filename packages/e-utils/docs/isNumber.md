---
outline: deep
---

# isNumber

Checks if `value` is classified as a `Number` primitive or object.

**Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
classified as numbers, use the `Number.isFinite` method.

## 版本

0.1.1

## 使用

- 语法

```js
isNumber(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a number, else `false`.

## 示例

```js
isNumber(3)
// => true

isNumber(Number.MIN_VALUE)
// => true

isNumber(Infinity)
// => true

isNumber('3')
// => false
```
