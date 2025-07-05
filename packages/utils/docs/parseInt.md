---
outline: deep
---

# parseInt

Converts `string` to an integer of the specified radix. If `radix` is
`undefined` or `0`, a `radix` of `10` is used unless `string` is a
hexadecimal, in which case a `radix` of `16` is used.

## 版本

0.1.3

## 使用

- 语法

```js
parseInt(value, radix) -> {number}
```

- 参数

| Name    | Type   | Description                         |
|---------|--------|-------------------------------------|
| value   | string | The value to convert                |
| radix   | number | The radix to interpret `string` by. |

- 返回值

Returns the converted integer.

## 示例

```js
parseInt('08')
// => 8
```
