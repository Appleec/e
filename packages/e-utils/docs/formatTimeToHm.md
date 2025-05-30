---
outline: deep
---

# formatTimeToHm

Turn hours into minutes into numbers.

## 版本

0.2.0

## 使用

- 语法

```js
formatTimeToHm(date, earlier) -> {number}
```

- 参数

| Name        | Type     | Required | Description |
|-------------|----------|----------|-------------|
| date        | Date     | Y        |             |
| earlier     | number   | N        | mm          |

- 返回值

Returns the number.

## 示例

```js
formatTimeToHm(new Date());
// => 2030
```
