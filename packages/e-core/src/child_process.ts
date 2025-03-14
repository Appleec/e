import {
    execa,
    execaSync,
    type Options as ExecaOptions,
    type SyncOptions as ExecaSyncOptions,
} from 'execa'
import c from 'ansis'

// Types exec
export interface ExecOptions extends ExecaOptions {
    abbrev?: boolean
    logger?: boolean
    dryRun?: boolean
    throwOnError?: boolean
}

// Types execSync
export interface ExecSyncOptions extends ExecaSyncOptions {
    abbrev?: boolean
    logger?: boolean
    dryRun?: boolean
    throwOnError?: boolean
}

/**
 * Execute a command asynchronously
 * @param {string} cmd
 * @param {string[]} args
 * @param {import("execa").Options} [opts]
 */
export function exec(
    cmd: string,
    args: string[],
    opts?: ExecOptions,
): Promise<any> {
    if (opts?.logger || opts?.dryRun)
        console.log(c.green(`> ${[cmd, ...args].join(' ')}`))

    if (opts?.dryRun)
        return Promise.resolve(void 0)

    return execa(cmd, args, opts)
        .then((spawned) => (
            opts?.abbrev
                ? spawned?.stdout
                : spawned
        ))
        .catch(e => {
            if (opts?.throwOnError ?? true)
                throw new Error(
                    c.red(`Running ${c.bold([cmd, ...args].join(' '))} in ${c.underline(opts?.cwd || e?.cwd || process.cwd())}:`) +
                    (e.stderr || e.stack || e.message)
                )
            return Promise.resolve(void 0)
        })
}

/**
 * Execute a command synchronously
 * @param {string} cmd
 * @param {string[]} args
 * @param {import("execa").SyncOptions} [opts]
 */
export function execSync(
    cmd: string,
    args: string[],
    opts?: ExecSyncOptions,
) {
    if (opts?.logger || opts?.dryRun)
        console.log(c.green(`> ${[cmd, ...args].join(' ')}`))

    if (opts?.dryRun)
        return void 0

    try {
        const spawned = execaSync(cmd, args, opts)

        return opts?.abbrev
            ? spawned?.stdout
            : spawned
    } catch (e) {
        if (opts?.throwOnError ?? true)
            throw new Error(
                c.red(`Running ${c.bold([cmd, ...args].join(' '))} in ${c.underline(opts?.cwd || e?.cwd || process.cwd())}:`) +
                (e.stderr || e.stack || e.message)
            )
        return void 0
    }
}

/**
 * Print command logger
 * @param cmd
 * @param args
 */
function cmdLog(cmd: string, args?: string[]) {
    const argStr = (Array.isArray(args) ? args.join(' ') : args) ?? ''
    console.log([cmd, argStr].join(' '))
    return ''
}
