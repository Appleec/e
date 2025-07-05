---
outline: deep
---

# isNumberLike

Checks if `value` is classified as a `Number` primitive or object.

## 版本

0.2.0

## 使用

- 语法

```js
isNumberLike(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a number, else `false`.

## 示例

```js
isNumberLike(3);
// => true

isNumberLike(Number.MIN_VALUE);
// => true

isNumberLike(Infinity);
// => true

isNumberLike('3');
// => false

isNumberLike(NaN);
// => false
```
