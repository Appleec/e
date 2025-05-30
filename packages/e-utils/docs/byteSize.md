---
outline: deep
---

# byteSize

Byte size conversion

## 版本

0.4.11

## 使用

- 语法

```js
byteSize(bytes: number, options?: object): string | object
```

- 参数

| Name    | Type    | Required | Description             |
|---------|---------|----------|-------------------------|
| bytes   | number  | Y        | The value to check.     |
| options | object  | N        | The value to process.   |

- 返回值

Returns the string or object.

## 示例

```js
byteSize(1200)
// => 1.20 kB

byteSize(1200, { type: 'iec' })
// => 1.17 KiB

byteSize.toPlainObject(1200)
// => { type: 'si', value: '1.20', unit: 'kB', long: 'kilobytes' }

byteSize.toPlainObject(1200, { type: 'iec' })
// => { type: 'iec', value: '1.17', unit: 'KiB', long: 'kibibytes' }
```
