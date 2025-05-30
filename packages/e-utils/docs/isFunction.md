---
outline: deep
---

# isFunction

Checks if `value` is classified as a `Function` object.

## 版本

0.1.1

## 使用

- 语法

```js
isFunction(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a function, else `false`.

## 示例

```js
isFunction(class Any{})
// => true

isFunction(() => {})
// => true

isFunction(async () => {})
// => true

isFunction(function * Any() {})
// => true

isFunction(Math.round)
// => true

isFunction(/abc/)
// => false
```
