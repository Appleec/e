import c from 'ansis'

/**
 * Print commits since the last version
 * @param values
 * @param options
 */
export async function printCommits(values = [], options?: any) {
  if (!values.length) {
    console.log()
    console.log(c.blue`i` + c.gray` No commits since the last version`)
    console.log()

    return
  }

  const prettified = values.map(v => c.green.underline(v))

  console.log()
  console.log(c.bold`${c.green(values.length)} Commits since the last version:`)
  console.log()
  console.log(prettified.join('\n'))
  console.log()
}

/**
 * Print assets
 * @param values
 * @param options
 */
export async function printAssets(values = [], options?: any) {
  if (!values.length) {
    console.log()
    console.log(c.blue`i` + c.gray` No ${options ?? 'changes'}.`)
    console.log()
    return
  }

  const prettified = values.map(v => c.green.underline(v))

  console.log()
  console.log(c.bold`${c.green(values.length)} ${options ?? 'changes'}:`)
  console.log()
  console.log(prettified.join('\n'))
  console.log()
}
