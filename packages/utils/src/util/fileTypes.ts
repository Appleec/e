import fileTypes from './_internal/fileTypes';
import getTag from './_internal/getTag';
import has from './has';

/**
 *
 * @param {string} value -
 * @param {*} options - parameter
 *  - field - mimeType(default), extension, tag
 *  - abbrev - false(default)
 */
function fileTypeWith(
  value: string = '',
  options?: any,
) {
  const defaultOptions = {
    field: 'mimeType', // extension
    abbrev: false,
    only: false,
  };

  if (getTag(options) === '[object String]' && has(defaultOptions, options)) {
    options = {
      ...defaultOptions,
      [options]: !!options,
    };
  } else if (getTag(options) === '[object Object]') {
    options = {
      ...defaultOptions,
      ...options,
    };
  } else {
    options = {
      ...defaultOptions,
    };
  }

  let result: any[] = [];

  // Get all mimeType: string[]
  if (value.length === 0) {
    options.field = 'mimeType';
    options.abbrev = true;
  }

  for (const o of fileTypes) {
    if (has(o, options.field) && o[options.field].includes(value)) {
      result.push((options.abbrev ? o.mimeType : o));
    }
  }

  result = (options.abbrev ? Array.from(new Set(result)) : result);

  return (options.only ? result[0] : result);
}



export default fileTypeWith;
