---
outline: deep
---

# toFinite

Converts `value` to a finite number.

## 版本

0.2.0

## 使用

- 语法

```js
toFinite(value) -> {number}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to convert       |

- 返回值

Returns the converted number.

## 示例

```js
toFinite(3.2)
// => 3.2

toFinite(Number.MIN_VALUE)
// => 5e-324

toFinite(Infinity)
// => 1.7976931348623157e+308

toFinite('3.2')
// => 3.2
```
