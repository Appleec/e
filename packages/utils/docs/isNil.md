---
outline: deep
---

# isNil

Checks if `value` is `null` or `undefined`.

## 版本

0.1.0

## 使用

- 语法

```js
isNil(value) -> {boolean}
```

- 参数

| Name   | Type       | Description         |
|--------|------------|---------------------|
| value  | *          | The value to check. |


- 返回值

Returns `true` if `value` is nullish, else `false`.

## 示例

```js
isNil(null)
// => true

isNil(void 0)
// => true

isNil(NaN)
// => false
```
