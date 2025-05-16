---
outline: deep
---

# convertToUnit

Unit conversion.

## 版本

0.2.0

## 使用

- 语法

```js
convertToUnit(value, unit) -> {string}
```

- 参数

| Name  | Type   | Default   | Description             |
|-------|--------|-----------|-------------------------|
| value | *      |           | The value to check.     |
| unit  | string | px        | The value to process.   |

- 返回值

Returns the string.

## 示例

```js
convertToUnit();
// => undefined

convertToUnit(16);
// => 16px

convertToUnit('a');
// => a

convertToUnit('16', 'g');
// => 16g
```
