---
outline: deep
---

# isDate

Checks if `value` is classified as a `Date` object.

## 版本

0.1.1

## 使用

- 语法

```js
isDate(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a date object, else `false`.

## 示例

```js
isDate(new Date)
// => true

isDate('Mon April 23 2012')
// => false
```
