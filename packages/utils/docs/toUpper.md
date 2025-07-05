---
outline: deep
---

# toUpper

Converts `string`, as a whole, to upper case just like
[String#toUpperCase](https://mdn.io/toUpperCase).

## 版本

0.1.2

## 使用

- 语法

```js
toUpper(value) -> {string}
```

- 参数

| Name    | Type   | Default   | Description                |
|---------|--------|-----------|----------------------------|
| value   | string | ''        | The value to convert       |

- 返回值

Returns the upper cased string.

## 示例

```js
toUpper('--foo-bar--')
// => '--FOO-BAR--'

toUpper('fooBar')
// => 'FOOBAR'

toUpper('__foo_bar__')
// => '__FOO_BAR__'
```
