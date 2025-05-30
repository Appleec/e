---
outline: deep
---

# toNumber

Converts `value` to a number.

## 版本

0.1.3

## 使用

- 语法

```js
toNumber(value) -> {number}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to convert       |

- 返回值

Returns the number.

## 示例

```js
toNumber(3.2)
// => 3.2

toNumber(Number.MIN_VALUE)
// => 5e-324

toNumber(Infinity)
// => Infinity

toNumber('3.2')
// => 3.2
```
