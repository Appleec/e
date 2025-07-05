---
outline: deep
---

# isObjectLike

Checks if `value` is object-like. A value is object-like if it's not `null`
and has a `typeof` result of "object".

## 版本

0.1.0

## 使用

- 语法

```js
isObjectLike(value) -> {boolean}
```

- 参数

| Name     | Type         | Description             |
|----------|--------------|-------------------------|
| value    | *            | The value to check.     |

- 返回值

Returns `true` if `value` is object-like, else `false`.

## 示例

```js
isObjectLike({})
// => true

isObjectLike([1, 2, 3])
// => true

isObjectLike(Function)
// => false

isObjectLike(null)
// => false
```
