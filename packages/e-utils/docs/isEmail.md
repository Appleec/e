---
outline: deep
---

# isEmail

Checks if `value` is an email.

## 版本

0.2.0

## 使用

- 语法

```js
isEmail(value) -> {boolean}
```

- 参数

| Name    | Type  | Description               |
|---------|-------|---------------------------|
| value   | *     | The value to check        |

- 返回值

Returns `true` if `value` is email, else `false`.

## 示例

```js
isEmail('12345@qq.com');
// => true

isEmail(NaN);
// => false
```
