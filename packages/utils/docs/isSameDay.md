---
outline: deep
---

# isSameDay

Checks if `value` is classified as a `Date` object.

## 版本

0.2.0

## 使用

- 语法

```js
isSameDay(dateLeft, dateRight) -> {boolean}
```

- 参数

| Name        | Type               | Required | Description           |
|-------------|--------------------|----------|-----------------------|
| dateLeft    | Date,number,string | Y        | The value to check    |
| dateRight   | Date,number,string | Y        | The value to check    |

- 返回值

The dates are in the same day (and year and month)

## 示例

```js
isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
// => true

isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
// => false

isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
// => false
```
