---
outline: deep
---

# isBuffer

Checks if `value` is a buffer.

## 版本

0.1.3

## 使用

- 语法

```js
isBuffer(value) -> {boolean}
```

- 参数

| Name    | Type  | Default | Description               |
|---------|-------|---------|---------------------------|
| value   | *     |         | The value to check        |

- 返回值

Returns `true` if `value` is a buffer, else `false`.

## 示例

```js
isBuffer(Buffer.alloc(2))
// => true

isBuffer(new Uint8Array(2))
// => false
```
