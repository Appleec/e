---
outline: deep
---

# isArray

Checks if `value` is classified as an `Array` object.

## 版本

0.1.1

## 使用

- 语法

```js
isArray(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is an array, else `false`.

## 示例

```js
isArray([1, 2, 3]);
// => true

isArray(document.body.children);
// => false

isArray('abc');
// => false
```
