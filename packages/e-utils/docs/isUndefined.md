---
outline: deep
---

# isUndefined

Checks if `value` is `undefined`.

## 版本

0.1.1

## 使用

- 语法

```js
isUndefined(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is `undefined`, else `false`.

## 示例

```js
isUndefined(void 0)
// => true

isUndefined(null)
// => false
```
