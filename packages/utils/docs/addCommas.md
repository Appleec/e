---
outline: deep
---

# addCommas

Add comma separator.

## 版本

0.2.0

## 使用

- 语法

```js
addCommas(value: number | string): string
```

- 参数

| Name      | Type           | Description  |
|-----------|----------------|--------------|
| value     | number, string |              |

- 返回值

Returns the string.

## 示例

```js
addCommas(20000)
// => 20,000

addCommas('20000')
// => 20,000

addCommas('20000%')
// => 20,000%

addCommas(20000.0015)
// => 20,000.0015
```
