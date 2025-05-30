---
outline: deep
---

# toInteger

Converts `value` to an integer.

## 版本

0.2.0

## 使用

- 语法

```js
toInteger(value) -> {number}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to convert       |

- 返回值

Returns the converted integer.

## 示例

```js
toInteger(3.2)
// => 3

toInteger(Number.MIN_VALUE)
// => 0

toInteger(Infinity)
// => 1.7976931348623157e+308

toInteger('3.2')
// => 3
```
