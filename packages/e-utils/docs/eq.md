---
outline: deep
---

# eq

Performs a
[`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
comparison between two values to determine if they are equivalent.

## 版本

0.1.3

## 使用

- 语法

```js
eq(value, other) -> {boolean}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to compare       |
| other   | *     | The other value to compare |

- 返回值

Returns `true` if the values are equivalent, else `false`.

## 示例

```js
const object = { 'a': 1 }
const other = { 'a': 1 }

eq(object, object)
// => true

eq(object, other)
// => false

eq('a', 'a')
// => true

eq('a', Object('a'))
// => false

eq(NaN, NaN)
// => true
```
