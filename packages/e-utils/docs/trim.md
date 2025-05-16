---
outline: deep
---

# trim

Removes leading and trailing whitespace or specified characters from `string`.

## 版本

0.1.0

## 使用

- 语法

```js
trim(value) -> {string}
```

- 参数

| Name    | Type         | Default     | Description             |
|---------|--------------|-------------|-------------------------|
| value   | string       | ''          | The string to trim.     |
| chars   | string       | whitespace  | The characters to trim. |


### 返回值

Returns the trimmed string.

## 示例

```js
trim('  abc  ');
// => 'abc'

trim('-_-abc-_-', '_-');
// => 'abc'

map(['  foo  ', '  bar  '], trim);
// => ['foo', 'bar']
```
