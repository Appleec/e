import c from 'ansis'
import isUnicodeSupported from 'is-unicode-supported'

const _isUnicodeSupported = isUnicodeSupported()

// https://github.com/sindresorhus/log-symbols/blob/main/symbols.js
export const info = {
    type: 'info',
    symbol: c.cyan(_isUnicodeSupported ? 'ℹ' : 'i'),
    label: c.cyan('info'),
    browser: 'ℹ️',
}

export const success = {
    type: 'success',
    symbol: c.green(_isUnicodeSupported ? '✔' : '√'),
    label: c.cyan('success'),
    browser: '✅',
}

export const error = {
    type: 'error',
    symbol: c.red(_isUnicodeSupported ? '✖' : '×'),
    label: c.red('error'),
    browser: '❌️',
}

export const warn = {
    type: 'warn',
    symbol: c.yellow(_isUnicodeSupported ? '⚠' : '‼'),
    label: c.yellow('warn'),
    browser: '',
}

export const exec = {
    type: 'exec',
    symbol: c.green(_isUnicodeSupported ? '❯' : '>'),
    label: c.green('exec'),
    browser: '',
}

export const mark = {
    type: 'mark',
    symbol: c.gray(_isUnicodeSupported ? '?' : '?'),
    label: c.gray('mark'),
    browser: '',
}
