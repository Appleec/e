import c from 'ansis'
import { execCommand } from './helper'

/**
 * Check worktree status
 */
export async function checkGitStatus() {
    const { stdout } = await execCommand('git', ['status', '--porcelain'])
    // if (!!stdout.trim()) {
    //   throw new Error(`Git working tree is not clean:\n${stdout}`)
    // }
    return stdout.trim()
}

/**
 * Get last second git tag name
 * @param latestTag
 */
export async function getLastSecondGitTag(latestTag?: string) {
    const { stdout: sha } = await execCommand('git', [
        'rev-list',
        `${latestTag || '--skip=1'}`,
        '--tags',
        '--max-count=1',
    ])

    const { stdout } =
        (await execCommand('git', ['describe', '--tags', '--abbrev=0', `${sha}^`].filter(Boolean), {
            logger: false,
            throwOnError: false,
        })) || {}

    return stdout || undefined
}

/**
 * Get latest git tag name
 * @param options
 */
export async function getLastGitTag(options?: {
    forEachRef?: boolean
    matchCxt?: string | RegExp
    excludeCxt?: string
    cmdArgs?: any
}): Promise<any> {
    let tag: string

    if (options?.forEachRef) {
        const { stdout } =
            (await execCommand(
                'git',
                [
                    '-c',
                    'versionsort.suffix=-',
                    'for-each-ref',
                    '--count=1',
                    '--sort=-v:refname',
                    '--format=%(refname:short)',
                    `refs/tags/${options?.matchCxt ?? ''}`,
                ].filter(Boolean),
                { throwOnError: false }
            )) || {}

        tag = stdout
    } else {
        const { stdout } =
            (await execCommand(
                'git',
                [
                    'describe',
                    '--tags',
                    '--abbrev=0',
                    options?.matchCxt ? `--match=${options?.matchCxt}` : '',
                    options?.excludeCxt ? `--exclude=${options?.excludeCxt}` : '',
                ].filter(Boolean),
                { throwOnError: false }
            )) || {}

        tag = stdout
    }

    return tag?.split('\n').at(0) || undefined
}

/**
 * Check git repo
 * print `.git` dir
 */
export async function isGitRepo() {
    const { stdout } = await execCommand('git', ['rev-parse', '--git-dir'])

    return !!stdout
}

/**
 * Get branch from refs
 */
export async function getLocalRepo(remote = 'origin') {
    const { stdout } = await execCommand('git', ['remote', '-v'])
    const reg = new RegExp(`${remote}\t(.*) \\(push`)
    const repo = stdout.match(reg)?.[1]

    return repo
}

/**
 * Get branch from refs
 */
export async function getRefsBranch() {
    const { stdout } = await execCommand('git', ['for-each-ref', '--format=%(refname:short)', 'refs/heads/'])

    return stdout.trim().split(/\r?\n/).filter(Boolean)
}

/**
 * Get file change in local
 */
export async function getLocalChanges() {
    const { stdout: fString } = await execCommand('git', ['ls-files', '--exclude-standard', '--modified', '--others'])

    return fString.trim().split(/\r?\n/)
    // .map(f => c.green.underline(f))
}

/**
 * Get last commits
 */
export async function getLastCommits() {
    const lastTag = await getLastGitTag()
    const logs = await getGitLog(lastTag)

    return logs
        .map((c: any) => {
            const [shortHash, message] = c.split('|')
            return { shortHash, message }
        })
        .map((ci: any) => {
            const { shortHash, message } = ci
            return [c.dim(shortHash), '   ', c.green(message)].join('')
        })
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
export async function getGitLog(from: string | undefined, to = 'HEAD') {
    const { stdout: str } = await execCommand('git', [
        '--no-pager',
        'log',
        `${from ? `${from}...${to}` : to}`,
        `--pretty=${GIT_LOG_FORMAT}`,
    ])

    return str.split('[GIT_LOG_COMMIT_END]\n').filter(Boolean)
}

/**
 * Get current git tag
 */
export async function getCurrentGitTag() {
    const { stdout } = await execCommand('git', ['tag', '--points-at', 'HEAD'])
    return stdout?.split('\n').at(0) || undefined
}

/**
 * Get Default branch
 * [] git remote show origin => HEAD branch: main
 * [] git config --get init.defaultBranch => <main|master>
 * @param remote
 */
export async function getHeadBranch(remote = 'origin') {
    // const { stdout } = await execCommand('git', ['config', '--get', 'init.defaultBranch'])
    const { stdout } = await execCommand('git', ['remote', 'show', remote])

    return stdout
        .split('\n')
        .filter((v: any) => v.includes('HEAD branch'))
        .map((c: any) => c.split(':')?.[1]?.trim())
        .filter(Boolean)?.[0]
}

/**
 * Get remote by branch
 * @param branch
 */
export async function getRemoteByBranch(branch: string) {
    const { stdout } = await execCommand('git', ['config', '--get', `branch.${branch}.remote`])

    return stdout
}

/**
 * Get remote origin url
 * git config --get remote.origin.url
 * @param branch
 */
export async function getRemoteOriginUrl(branch: string = 'origin') {
    const { stdout } = await execCommand('git', ['config', '--get', `remote.${branch}.url`])

    return stdout
}

/**
 * Get current branch
 *
 * command:
 * git branch --show-current
 * git rev-parse --abbrev-ref HEAD
 */
export async function getCurrentBranch() {
    const { stdout } = await execCommand('git', ['branch', '--show-current'])

    return stdout
}
