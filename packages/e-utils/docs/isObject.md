---
outline: deep
---

# isObject

Checks if `value` is the
[language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)

## 版本

0.1.0

## 使用

- 语法

```js
isObject(value) -> {boolean}
```

- 参数

| Name     | Type         | Attributes    | Default | Description             |
|----------|--------------|---------------|---------|-------------------------|
| value    | *            |               |         | The value to check.     |

- 返回值

Returns `true` if `value` is an object, else `false`.

## 示例

```js
isObject({})
// => true

isObject([1, 2, 3])
// => true

isObject(Function)
// => true

isObject(null)
// => false
```
