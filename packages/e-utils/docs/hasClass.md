---
outline: deep
---

# hasClass

Determine whether a `DOM` element has a `class` attribute.

## 版本

0.2.0

## 使用

- 语法

```
hasClass(element: Element, className: string): boolean
```

- 参数

| Name      | Type      | Required | Description  |
|-----------|-----------|----------|--------------|
| element   | Element   | Y        | DOM element. |
| className | string    | Y        | className    |

- 返回值

`true` if `element` is Element, `false` otherwise.

## 示例

```js
var el = document.querySelector('.wrapper');

hasClass(el, 'wrapper');
// => true
```
