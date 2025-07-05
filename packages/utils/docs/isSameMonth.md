---
outline: deep
---

# isSameMonth

Checks the dates in the same month (and year).

## 版本

0.2.0

## 使用

- 语法

```js
isSameMonth(dateLeft, dateRight) -> {boolean}
```

- 参数

| Name        | Type               | Required | Description           |
|-------------|--------------------|----------|-----------------------|
| dateLeft    | Date,number,string | Y        | The value to check    |
| dateRight   | Date,number,string | Y        | The value to check    |

- 返回值

The dates are in the same month (and year).

## 示例

```js
// Are 2 September 2014 and 25 September 2014 in the same month?
isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
// => true

// Are 2 September 2014 and 25 September 2015 in the same month?
isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
// => false
```
