---
outline: deep
---

# isPlainObject

Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.

## 版本

0.1.3

## 使用

- 语法

```js
isPlainObject(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is a plain object, else `false`.

## 示例

```js
function Foo() {
    this.a = 1
}

isPlainObject(new Foo)
// => false

isPlainObject([1, 2, 3])
// => false

isPlainObject({ 'x': 0, 'y': 0 })
// => true

isPlainObject(Object.create(null))
// => true
```
