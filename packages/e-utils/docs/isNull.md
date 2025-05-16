---
outline: deep
---

# isNull

Checks if `value` is `null`.

## 版本

0.1.0

## 使用

- 语法

```js
isNull(value) -> {boolean}
```

- 参数

| Name   | Type       | Description         |
|--------|------------|---------------------|
| value  | *          | The value to check. |

- 返回值

Returns `true` if `value` is `null`, else `false`.

## 示例

```js
isNull(null)
// => true

isNull(void 0)
// => false
```
