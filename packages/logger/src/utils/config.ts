// Imports
import c from 'ansis';
import isUnicodeSupported from 'is-unicode-supported';

const _isUnicodeSupported = isUnicodeSupported();

export const info = {
  tag: 'INFO',
  color: c.cyan,
  background: c.bgCyan,
  symbol: _isUnicodeSupported ? 'i' : 'i',
  browserSymbol: 'ℹ️',
};

export const warn = {
  tag: 'WARN',
  color: c.yellow,
  background: c.bgYellow,
  symbol: _isUnicodeSupported ? '⚠' : '‼',
  browserSymbol: '⚠️',
};

export const success = {
  tag: 'SUCCESS',
  color: c.green,
  background: c.bgGreen,
  symbol: _isUnicodeSupported ? '✓' : '√',
  browserSymbol: '✅',
};

export const error = {
  tag: 'ERROR',
  color: c.red,
  background: c.bgRed,
  symbol: _isUnicodeSupported ? '✗' : '×',
  browserSymbol: '❌️',
};
