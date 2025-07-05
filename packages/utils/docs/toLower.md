---
outline: deep
---

# toLower

Converts `string`, as a whole, to lower case just like
[String#toLowerCase](https://mdn.io/toLowerCase).

## 版本

0.1.2

## 使用

- 语法

```js
toLower(value) -> {string}
```

- 参数

| Name    | Type  | Default  | Description                |
|---------|-------|----------|----------------------------|
| value   | *     | ''       | The value to convert       |

- 返回值

Returns the lower cased string.

## 示例

```js
toLower('--Foo-Bar--');
// => '--foo-bar--'

toLower('fooBar');
// => 'foobar'

toLower('__FOO_BAR__');
// => '__foo_bar__'
```
