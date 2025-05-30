---
outline: deep
---

# getScrollContainer

Get scroll element container

## 版本

0.2.0

## 使用

- 语法

```js
getScrollContainer(el, vertical?) -> {HTMLDocument}
```

- 参数

| Name        | Type        | Required | Description  |
|-------------|-------------|----------|--------------|
| el          | HTMLElement | Y        | DOM element. |
| vertical    | boolean     | N        |              |

- 返回值

No return value.

## 示例

```js
// <div id="wrapper" style="overflow: scroll;"></div>
const el = document.querySelector('div')

getScrollContainer(el);
// => window or target
```
