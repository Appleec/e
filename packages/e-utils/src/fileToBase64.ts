/**
 * File to Base64
 *
 * @static
 * @since 0.4.8
 * @category Util
 * @param {File} file The value to process.
 * @param {*} options The value to process.
 * @returns {string} Returns the number.
 * @example
 *
 * const file = new File(['Hello world'], 'file.txt', { type: "text/plain" });
 * fileToBase64(file);
 * // => "data:text/plain;base64,SGVsbG8gd29ybGQ="
 *
 * fileToBase64(file, 'abbrev');
 * // => "SGVsbG8gd29ybGQ="
 *
 * fileToBase64(file, { abbrev: true });
 * // => "SGVsbG8gd29ybGQ="
 */
function fileToBase64(file: File, options?: any) {
  const defaultOptions = {
    // pretty: 'full', // default brief short abbrev full
    abbrev: false, //
  };

  if (options && typeof options === 'string' && defaultOptions.hasOwnProperty(options)) {
    options = {
      ...defaultOptions,
      [options]: !!options,
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

  return new Promise((resolve, reject) => {
    let result;

    const reader = new FileReader();
    reader.readAsDataURL(file); // 读取文件为DataURL

    /**
     * 该方法在读取时调用
     */
    // reader.onloadstart = () => {
    //   // console.log("starting file");
    //   // console.log(reader.readyState); // 调用函数,但还没有结束,返回1
    // }

    /**
     * 该方法在读取成功时调用
     */
    reader.onload = () => {
      // console.log("successfully loaded file");
      // console.log(event.target.result);
      // console.log(reader.result);
      // console.log(reader.readyState); // 调用完成,返回2

      result = reader.result;

      if (options.abbrev) result = result.slice(result.indexOf(',') + 1);
    }

    /**
     * 该方法在读取结束时调用
     */
    reader.onloadend = () => {
      // console.log("ending file");
      resolve(result);
    }

    /**
     * 读取过程中触发
     */
    // reader.onprogress = (e) => {
    //   // console.log("Reading");
    //   // console.log("loaded=>" + e.loaded) // 获取已经加载的数据量
    // }

    /**
     * 该方法在调用abort函数时触发
     */
    // reader.onabort = () => {
    //   // console.log("Operation ends");
    // }

    /**
     * 当读取出现失败时触发
     */
    // reader.onerror = () => {
    //   // console.log("An error occurred");
    //   // console.log(reader.error);
    // }
    reader.onerror = reject;
  })
}

export default fileToBase64;
