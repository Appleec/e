---
outline: deep
---

# downloadFile

To create a DOMString, the URL.createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
The lifetime of this URL is bound to the document in the window that created it.
This new URL object represents the specified File or Blob object.

## 版本

0.2.0

## 使用

- 语法

```js
downloadFile(data, filename, mime, bom) -> {void}
```

- 参数

| Name      | Type   | Required | Description                 |
|-----------|--------|----------|-----------------------------|
| data      | *      | Y        |                             |
| filename  | string | N        |                             |
| mime      | string | N        |                             |
| bom       | string | N        |                             |

- 返回值

Returns the File.

## 示例

```js
downloadFile();
// => File
```
