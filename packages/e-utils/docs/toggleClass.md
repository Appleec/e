---
outline: deep
---

# toggleClass

Toggle class for the selected element.

## 版本

0.2.0

## 使用

- 语法

```js
toggleClass(ele, className) -> {void}
```

- 参数

| Name        | Type        | Description  |
|-------------|-------------|--------------|
| ele         | HTMLElement | DOM element. |
| className   | string      |              |

- 返回值

No return value.

## 示例

```js
// <div class="wrapper"></div>
const el = document.querySelector('div');

// 'wrapper' -> ''
toggleClass(el, 'wrapper');
// => ''

// '' -> 'wrapper'
toggleClass(el, 'wrapper');
// => 'wrapper'
```
