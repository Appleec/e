---
outline: deep
---

# kebabCase

Converts `string` to
[kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).

## 版本

0.1.3

## 使用

- 语法

```js
kebabCase(value) -> {string}
```

- 参数

| Name    | Type  | Default | Description          |
|---------|-------|---------|----------------------|
| value   | *     | ''      | The value to convert |

- 返回值

Returns the kebab cased string.

## 示例

```js
kebabCase('Foo Bar')
// => 'foo-bar'

kebabCase('fooBar')
// => 'foo-bar'

kebabCase('__FOO_BAR__')
// => 'foo-bar'
```
