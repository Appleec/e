---
outline: deep
---

# isElement

Checks if `value` is likely a DOM element.

## 版本

0.1.3

## 使用

- 语法

```js
isElement(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a DOM element, else `false`.

## 示例

```js
isElement(document.body)
// => true

isElement('<body>')
// => false
```
