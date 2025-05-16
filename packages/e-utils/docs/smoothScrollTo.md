---
outline: deep
---

# smoothScrollTo

Smoothly scroll element to the given target (element.scrollTop) for the given duration
Returns a promise that's fulfilled when done, or rejected if interrupted

## 版本

0.2.0

## 使用

- 语法

```js
smoothScrollTo(element, target, duration) -> {void}
```

- 参数

| Name       | Type        | Required | Description  |
|------------|-------------|----------|--------------|
| element    | HTMLElement | Y        | DOM element. |
| target     | number      | Y        |              |
| duration   | number      | Y        |              |

- 返回值

Returns the promise.

## 示例

```js
const el = document.querySelector('div')

smoothScrollTo(el, 10, 0);
// =>

smoothScrollTo(el, 10, 0).then();
// =>
```
