---
outline: deep
---

# isSymbol

Checks if `value` is classified as a `Symbol` primitive or object.

## 版本

0.1.1

## 使用

- 语法

```js
isSymbol(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check.       |

- 返回值

Returns `true` if `value` is a symbol, else `false`.

## 示例

```js
isSymbol(Symbol.iterator)
// => true

isSymbol('abc')
// => false
```
