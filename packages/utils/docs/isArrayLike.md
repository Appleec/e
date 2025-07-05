---
outline: deep
---

# isArrayLike

Checks if `value` is array-like. A value is considered array-like if it's
not a function and has a `value.length` that's an integer greater than or
equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.

## 版本

0.1.1

## 使用

- 语法

```js
isArrayLike(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is array-like, else `false`.

## 示例

```js
isArrayLike([1, 2, 3])
// => true

isArrayLike(document.body.children)
// => true

isArrayLike('abc')
// => true

isArrayLike(Function)
// => false
```
