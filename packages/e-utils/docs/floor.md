---
outline: deep
---

# floor

Computes `number` rounded down to `precision`.

## 版本

0.4.11

## 使用

- 语法

```js
floor(number: number, precision?: number): number
```

- 参数

| Name        | Type        | Required | Description                       |
|-------------|-------------|----------|-----------------------------------|
| number      | number      | Y        | The number to round down.  |
| precision      | number      | N        | The precision to round down to. |

- 返回值

Returns the rounded down number.

## 示例

```js
floor(4.006)
// => 4

floor(0.046, 2)
// => 0.04

floor(4060, -2)
// => 4000
```
