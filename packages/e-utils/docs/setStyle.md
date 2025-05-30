---
outline: deep
---

# setStyle

Styling DOM elements.

## 版本

0.2.0

## 使用

- 语法

```js
setStyle(el, styleName, value) -> {void}
```

- 参数

| Name        | Type          | Description                              |
|-------------|---------------|------------------------------------------|
| el          | HTMLElement   | DOM element.                             |
| styleName   | string        | Style key, eg:color, fontSize and so on. |
| value       | string,number | Style value                              |

- 返回值

No return value.

## 示例

```js
const el = window.document.createElement('div')

setStyle()
// => undefined

setStyle(el, 'color', 'red')
// => <div style="color: red;"></div>

setStyle(el, { color: 'red', fontSize: '16px' })
// => <div style="color: red; font-size: 16px;"></div>
```
