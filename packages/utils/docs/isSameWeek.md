---
outline: deep
---

# isSameWeek

Checks if `dateLeft` and `dateRight` is the same week.

## 版本

0.2.0

## 使用

- 语法

```js
isSameDay(dateLeft, dateRight, options) -> {boolean}
```

- 参数

| Name          | Type               | Required | Description           |
|---------------|--------------------|----------|-----------------------|
| dateLeft      | Date,number,string | Y        | The value to check    |
| dateRight     | Date,number,string | Y        | The value to check    |
| options       | object,number      | N        | The value to check    |

- 返回值

The dates are in the same week (and month and year)

## 示例

```js
isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
// => true

// If week starts with Monday
isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
    weekStartsOn: 1
})
// => false
```
