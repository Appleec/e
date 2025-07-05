---
outline: deep
---

# removeClass

Remove a specified `class` from a `DOM` element.

## 版本

0.2.0

## 使用

- 语法

```js
removeClass(el: Element, className: string): void
```

- 参数

| Name      | Type    | Required | Description  |
|-----------|---------|----------|--------------|
| el        | Element | Y        | DOM element. |
| className | string  | Y        |              |

- 返回值

This function does not return anything.

## 示例

```js
// `<div class="wrapper container"></div>`
var el = document.querySelector('.wrapper');

removeClass(el, 'container');
// => <div class="wrapper "></div>
```
