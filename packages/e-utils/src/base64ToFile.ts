import fileTypeWith from './fileTypeWith';

/**
 * base64ToFile
 *
 * @param {string} base64String - base64 编码字符串
 *  - 完整字符串 - 默认, 正则 data:(.*?)(;base64)?,(.*)
 *  - 简短字符串 - 需要 options.mimeType 参数，否则无法知道文件类型，可能产生异常
 * @param {*} options - 配置选项
 *  - fileName - 文件名，包括后缀
 *  - mimeType - 文件类型
 * @returns {File} - Return File Type.
 *
 * @example
 *
 * base64ToFile('data:text/plain;SGVsbG8gd29ybGQ=', 'file.txt');
 * // => File {}
 *
 * base64ToFile('SGVsbG8gd29ybGQ=', 'file.txt');
 * // => File {}
 *
 * base64ToFile('SGVsbG8gd29ybGQ=', { fileName: 'file.txt', mimeType: 'text/plain' });
 * // => File {}
 *
 */
function base64ToFile(base64String = '', options?: any) {
  const defaultOptions = {
    fileName: '',
    // mimeType: 'text/plain',
  };

  if (options && typeof options === 'string') {
    options = {
      ...defaultOptions,
      fileName: options,
    };
  } else if (options && typeof options === 'object') {
    options = {
      ...defaultOptions,
      ...options,
    };
  } else {
    options = {
      ...defaultOptions,
    };
  }

  const arr = base64String.split(/[,;]/);
  const matchValue = arr[0].match(/:(.*?);/);
  const mime = matchValue && matchValue[1];
  // console.log('=>', /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(arr[arr.length - 1]))
  const bstr = window.atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  if (mime) {
    options.mimeType = mime;
  } else if (!options.mimeType && options.fileName.length) {
    const cArr = options.fileName.split('.');
    const extension = cArr[cArr.length - 1];

    // NOTE: 根据 `mimeType` 表进行类型匹配
    if (extension) options.mimeType = fileTypeWith(extension, {
      field: 'extension',
      abbrev: true ,
      only: true
    });
  }

  return new File(
    [u8arr],
    options.fileName,
    { type: options.mimeType }
  );
}

// /**
//  * Get file extension
//  * @param prop
//  */
// function sliceExtension(prop: string) {
//   const _index = prop.indexOf(".");
//   if (_index > -1) {
//     return sliceExtension(prop.slice(_index + 1));
//   }
//   return prop;
// }

export default base64ToFile;
