import c from 'ansis'
import isUnicodeSupported from 'is-unicode-supported'

const _isUnicodeSupported = isUnicodeSupported()

// https://github.com/sindresorhus/log-symbols/blob/main/symbols.js
export const info = c.cyan(_isUnicodeSupported ? 'ℹ' : 'i')
export const success = c.green(_isUnicodeSupported ? '✔' : '√')
export const warn = c.yellow(_isUnicodeSupported ? '⚠' : '‼')
export const error = c.red(_isUnicodeSupported ? '✖' : '×')