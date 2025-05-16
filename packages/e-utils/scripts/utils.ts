import { execSync } from 'node:child_process'
import * as fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cwd, chdir } from 'node:process'

import c from 'ansis'
import * as execa from 'execa'
import { $fetch } from 'ofetch'

// @ts-ignore
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../src')
export const DIR_DIST = resolve(__dirname, '../dist')
export const DIR_DOCS = resolve(__dirname, '../docs')
export const DIR_DOCS_DIST = resolve(__dirname, '../docs/.vitepress/dist')

/**
 * Custom command from execa
 * @param bin
 * @param args
 * @param opt
 */
export async function run(bin, args, opt?) {
  opt = Object.assign({ logger: true }, opt)
  if (opt.logger) console.log(c.green(`> ${[bin, ...args].join(' ')}`))
  try {
    return await execa.execa(bin, args, { stdio: 'inherit', ...opt })
  } catch (e) {
    throw new Error(c.bold(c.red(`Error running ${c.bold([bin, ...args].join(' '))} in ${c.underline(opt.cwd)}:`)) + (e.stderr || e.stack || e.message))
  }
}

/**
 * Print step log
 * @param value
 */
export async function printStep(value) {
  console.log()
  console.log(c.cyan(`# ${value}`))
}

/**
 * Print assets
 * @param values
 * @param options
 */
export async function printAssets(values = [], options?) {
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

/**
 * Print commits since the last version
 * @param values
 * @param options
 */
export async function printCommits(values = [], options?) {
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


// Get contributors
async function fetchContributors(page = 1) {
  // contributors that contribute to repos other than `Appleec/e-utils`, required for contributor avatar to work
  const additional = ['Appleec'];

  const collaborators: string[] = []
  const data = await $fetch<{ login: string }[]>(`https://api.github.com/repos/Appleec/e-utils/contributors?per_page=100&page=${page}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }) || []
  collaborators.push(...data.map(i => i.login))
  if (data.length === 100)
    collaborators.push(...(await fetchContributors(page + 1)))

  return Array.from(new Set([
    ...collaborators.filter(collaborator => !['renovate[bot]', 'dependabot[bot]', 'renovate-bot'].includes(collaborator)),
    ...additional,
  ]))
}

/**
 * Update Contributors
 */
export async function updateContributors() {
  const collaborators = await fetchContributors()
  await fs.writeFile(join(DIR_SRC, './contributors.json'), `${JSON.stringify(collaborators, null, 2)}\n`, 'utf8')
}

/**
 * Command from execSync
 * @param cmd
 * @param options
 */
export function execCommand(
  cmd: string,
  options?: { cwd?: string, throwOnError?: boolean },
): string {
  try {
    return execSync(cmd, { encoding: 'utf8', cwd: options?.cwd }).trim()
  }
  catch (error) {
    if (options?.throwOnError)
      throw error
    return ''
  }
}

/**
 * Get last git tag
 */
export function getLastGitTag(): string | undefined {
  return execCommand('git describe --tags --abbrev=0')?.split('\n').at(0) || undefined
}

/**
 * Get current git tag
 */
export function getCurrentGitTag(): string | undefined {
  return execCommand('git tag --points-at HEAD') || undefined
}

/**
 * The format of git log
 *
 * commit_short_hash | subject | author_name | author_email | author_date | body
 *
 * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
 *
 * Note: Make sure that `body` is in last position, as `\n` or `|` in body may breaks subsequent processing.
 *
 * @example stdout
 *
 * ```bash
 * $ git log --format="%h|%s|%an|%ae|%ad|%b[GIT_LOG_COMMIT_END]"
 * 9cfa09f|feat(scope): commit message|author1|author1@example.com|Thu Jan 23 17:42:15 2025 +0800|breaking changes: this is a breaking change
 * Co-authored-by: author2 <test@example.com>[GIT_LOG_COMMIT_END]
 * 0000001|feat(scope): commit message2|author1|author1@example.com|Thu Jan 23 17:42:15 2025 +0800|[GIT_LOG_COMMIT_END]
 * (END)
 * ```
 */
const GIT_LOG_FORMAT = '%h|%s|%an|%ae|%ad|%b[GIT_LOG_COMMIT_END]'

export function getGitLog(from: string | undefined, to = 'HEAD'): string[] {
  return execCommand(`git --no-pager log "${from ? `${from}...${to}` : to}" --pretty="${GIT_LOG_FORMAT}"`)
    .split('[GIT_LOG_COMMIT_END]\n')
    .filter(Boolean)
}
