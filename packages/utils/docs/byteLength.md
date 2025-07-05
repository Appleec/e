---
outline: deep
---

# byteLength

Calculate byte length

## 版本

0.2.0

## 使用

- 语法

```js
byteLength(value: string, options?: object): number
```

- 参数

| Name    | Type   | Required | Description             |
|---------|--------|----------|-------------------------|
| value   | string | Y        | The value to check.     |
| options | object | N        | The value to process.   |

- 返回值

Returns the byte length of an utf8 string.

## 示例

```js
byteLength('abcd');
// => 4

byteLength('😊');
// => 4

byteLength('你是谁');
// => 9
```
