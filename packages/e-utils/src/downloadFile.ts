/**
 * @author appleex
 * @date 2024-09-06 13:11
 */

/**
 * To create a DOMString, the URL.createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
 * The lifetime of this URL is bound to the document in the window that created it.
 * This new URL object represents the specified File or Blob object.
 *
 * @since 0.2.0
 * @category Dom
 * @param {*} data The value to process.
 * @param {string} filename File name.
 * @param {string} mime File type.
 * @param {string} bom The value to process.
 * @returns {void} Returns the File.
 * @example
 *
 * downloadFile();
 * // => file
 *
 */
function downloadFile(data: any, filename: string, mime: string, bom: string): void {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      ;(window.navigator as any).msSaveBlob(blob, filename)
  } else {
    const URL = window.webkitURL || window.URL
    const blobURL = URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', filename)

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
      }

      document.body.appendChild(tempLink)
      tempLink.click()
      setTimeout(function () {
          document.body.removeChild(tempLink)
          URL.revokeObjectURL(blobURL)
      }, 100)
  }
}

export default downloadFile;
