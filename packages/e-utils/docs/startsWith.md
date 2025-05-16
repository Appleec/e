---
outline: deep
---

# startsWith

The `startsWith()` method of String values determines whether this string begins with the characters of a specified string, returning `true` or `false` as appropriate.

## 版本

0.4.10

## 使用

- 语法

```ts
startsWith(value: string, target: string, position?: number): boolean;
```

- 参数

| Name      | Type   | Required | Description                                                                                                                                                                                                                                                                |
|-----------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value     | string | Y        | The string to inspect.                                                                                                                                                                                                                                                     |
| target    | string | Y        | The characters to be searched for at the start of this string. Cannot be a regex  . All values that are not regexes are coerced to strings  , so omitting it or passing undefined causes `startsWith()` to search for the string "undefined", which is rarely what you want. |
| position  | number | N        | The start position at which searchString is expected to be found (the index of `target`'s first character). Defaults to `0`.                                                                                                                                                 |

- 返回值

Returns `true` if the given characters are found at the beginning of the string, including when `target` is an empty string, otherwise `false`.

## 示例

```js
startsWith('abc', 'a')
// => true

startsWith('abc', 'b')
// => false

startsWith('abc', 'b', 1)
// => true
```
