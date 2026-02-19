/**
 * 复制指定字符串到粘贴板
 * @param text 需要复制的字符串
 * @returns 返回一个Promise，成功时为true，失败时为false
 */
function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 方法1: 使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 方法2: 降级方案 - 使用 textarea 和 execCommand
    const textArea = document.createElement('textarea')
    textArea.value = text

    // 隐藏 textarea，不在可视区域显示
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.opacity = '0'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)

    return successful
  }
  catch (err) {
    console.error('复制到粘贴板失败:', err)
    return false
  }
}

export default copyToClipboard;
