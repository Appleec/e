---
outline: deep
---

# isArrayLikeObject

This method is like `isArrayLike` except that it also checks if `value`
is an object.

## 版本

0.1.3

## 使用

- 语法

```js
isArrayLikeObject(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is an array-like object,

## 示例

```js
isArrayLikeObject([1, 2, 3])
// => true

isArrayLikeObject(document.body.children)
// => true

isArrayLikeObject('abc')
// => false

isArrayLikeObject(Function)
// => false
```
