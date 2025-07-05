---
outline: deep
---

# toPlainObject

Converts `value` to a plain object flattening inherited enumerable string
keyed properties of `value` to own properties of the plain object.

## 版本

0.1.3

## 使用

- 语法

```js
toPlainObject(value) -> {Object}
```

- 参数

| Name    | Type  | Description                |
|---------|-------|----------------------------|
| value   | *     | The value to convert       |

- 返回值

Returns the converted plain object.

## 示例

```js
function Foo() {
    this.b = 2
}

Foo.prototype.c = 3

assign({ 'a': 1 }, new Foo)
// => { 'a': 1, 'b': 2 }

assign({ 'a': 1 }, toPlainObject(new Foo))
// => { 'a': 1, 'b': 2, 'c': 3 }
```
