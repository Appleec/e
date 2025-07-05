---
outline: deep
---

# getStyle

Get DOM element style.

## 版本

0.2.0

## 使用

- 语法

```js
getStyle(el, styleName) -> {void}
```

- 参数

| Name        | Type          | Description                              |
|-------------|---------------|------------------------------------------|
| el          | HTMLElement   | DOM element.                             |
| styleName   | string        | Style key, eg:color, fontSize and so on. |

- 返回值

Returns style value of DOM

## 示例

```js
// <div id="wrapper" style="color: red; font-size: 14px;"></div>
const el = document.querySelector('div')

getStyle(el, 'color')
// => 'red'

// Support `font-size`
getStyle(el, 'fontSize')
// => '14px'
```
