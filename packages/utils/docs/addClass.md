---
outline: deep
---

# addClass

`DOM` element adds a new `class`.

## 版本

0.2.0

## 使用

- 语法

```js
addClass(element: Element, className: string): void
```

- 参数

| Name      | Type       | Required | Description    |
|-----------|------------|----------|----------------|
| element   | Element    | Y        | DOM element.   |
| className | string     | Y        | className      |

- 返回值

This function does not return anything.

## 示例

```js
// `<div class="wrapper">Hello world</div>`
var el = document.querySelector('.wrapper');

addClass(el, 'container');
// => "<div class='wrapper container'>Hello world</div>"
```
