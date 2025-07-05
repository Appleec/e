---
outline: deep
---

# camelCase

Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).

## 版本

0.1.3

## 使用

- 语法

```js
camelCase(value) -> {string}
```

- 参数

| Name    | Type  | Default | Description          |
|---------|-------|---------|----------------------|
| value   | *     | ''      | The value to convert |

- 返回值

Returns the camel cased string.

## 示例

```js
camelCase('Foo Bar')
// => 'fooBar'

camelCase('--foo-bar--')
// => 'fooBar'

camelCase('__FOO_BAR__')
// => 'fooBar'
```
