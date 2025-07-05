---
outline: deep
---

# round

Computes `number` rounded to `precision`.

## 版本

0.4.11

## 使用

- 语法

```js
round(number: number, precision?: number): number
```

- 参数

| Name        | Type        | Required | Description                       |
|-------------|-------------|----------|-----------------------------------|
| number      | number      | Y        | The number to round.  |
| precision      | number      | N        | The precision to round to. |

- 返回值

Returns the rounded number.

## 示例

```js
round(4.006)
// => 4

round(4.006, 2)
// => 4.01

round(4060, -2)
// => 4100
```
