---
outline: deep
---

# isArguments

Checks if `value` is likely an `arguments` object.

## 版本

0.1.3

## 使用

- 语法

```js
isArguments(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is an `arguments` object, else `false`.

## 示例

```js
isArguments(function() { return arguments }())
// => true

isArguments([1, 2, 3])
// => false
```
