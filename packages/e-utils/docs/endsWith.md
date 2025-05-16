---
outline: deep
---

# endsWith

The `endsWith()` method of String   values determines whether a string ends with the characters of this string, returning `true` or `false` as appropriate.

## 版本

0.4.10

## 使用

- 语法

```ts
endsWith(value: string, target: string, position?: number): boolean;
```

- 参数

| Name      | Type   | Required | Description                                                                                                                                                                                                                                                                |
|-----------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value     | string | Y        | The string to inspect.                                                                                                                                                                                                                                                     |
| target    | string | Y        | The characters to be searched for at the start of this string. Cannot be a regex  . All values that are not regexes are coerced to strings  , so omitting it or passing undefined causes `startsWith()` to search for the string "undefined", which is rarely what you want. |
| position  | number | N        | The start position at which searchString is expected to be found (the index of `target`'s first character). Defaults to `0`.                                                                                                                                                 |

- 返回值

Returns `true` if the given characters are found at the end of the string, including when `target` is an empty string; otherwise, false.

## 示例

```js
endsWith('abc', 'c')
// => true

endsWith('abc', 'b')
// => false

endsWith('abc', 'b', 2)
// => true
```
