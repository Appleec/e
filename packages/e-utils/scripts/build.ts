import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

import * as execa from 'execa'
import c from 'ansis'

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIR_DIST = resolve(DIR_ROOT, 'dist')

/**
 * main
 */
async function main() {
  // Clean
  console.log(c.cyan('\n# Clean up'))
  await cleanDist()

  // do something...

  // Rollup
  console.log(c.cyan('\n# Rollup'))
  await run('npm', ['run', 'build:rollup'])

  // do something...
}

/**
 * Clean dist
 */
async function cleanDist() {
  if (!existsSync(DIR_DIST))
    return

  await fs.rm(DIR_DIST, { recursive: true })

  console.log()
  console.log(c.bold`${c.green(1)} Removed:`)
  console.log()
  console.log([c.green.underline(DIR_DIST)].join('\n'))
  console.log()
}

/**
 * Run command
 * @param bin
 * @param args
 * @param opt
 */
async function run(bin, args, opt?) {
  opt = Object.assign({ logger: true }, opt)
  if (opt.logger)
    console.log(c.green(`> ${[bin, ...args].join(' ')}`))

  try {
    return await execa.execa(bin, args, { stdio: 'inherit', ...opt })
  } catch (e) {
    throw new Error(c.bold(c.red(`Error running ${c.bold([bin, ...args].join(' '))} in ${c.underline(process.cwd)}:`)) + (e.stderr || e.stack || e.message))
  }
}

main().catch((err) => console.error(err))
