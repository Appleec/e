---
outline: deep
---

# ceil

Adds two numbers.

## 版本

0.4.11

## 使用

- 语法

```js
ceil(number: number, precision?: number): number
```

- 参数

| Name        | Type        | Required | Description                       |
|-------------|-------------|----------|-----------------------------------|
| number      | number      | Y        | The number to round up.  |
| precision      | number      | N        | The precision to round up to. |

- 返回值

Returns the rounded up number.

## 示例

```js
ceil(4.006)
// => 5

ceil(6.004, 2)
// => 6.01

ceil(6040, -2)
// => 6100
```
