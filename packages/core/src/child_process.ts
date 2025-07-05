import {
    execa,
    execaSync,
    execaCommand,
    execaCommandSync,
    type Options as ExecaOptions,
    type SyncOptions as ExecaSyncOptions,
} from 'execa';
import c from 'ansis';

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
    // (Array.isArray(args) ? args.join(' ') : args) ?? ''
    if (opts?.logger || opts?.dryRun)
        console.log(c.green(`> ${[cmd, ...args].join(' ')}`));

    if (opts?.dryRun)
        return Promise.resolve(void 0);

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
                    (e.stderr || e.stack || e.message),
                );
            return Promise.resolve(void 0);
        });
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
        console.log(c.green(`> ${[cmd, ...args].join(' ')}`));

    if (opts?.dryRun)
        return void 0;

    try {
        const spawned = execaSync(cmd, args, opts);

        return opts?.abbrev
            ? spawned?.stdout
            : spawned;
    } catch (e) {
        if (opts?.throwOnError ?? true)
            throw new Error(
                c.red(`Running ${c.bold([cmd, ...args].join(' '))} in ${c.underline(opts?.cwd || e?.cwd || process.cwd())}:`) +
                (e.stderr || e.stack || e.message),
            );
        return void 0;
    }
}

/**
 * Execute a command asynchronously (string)
 * @param cmd
 * @param opts
 */
export function execCommand(
    cmd: string,
    opts?: ExecOptions,
) {
    if (opts?.logger || opts?.dryRun)
        console.log(c.green(`> ${[cmd].join(' ')}`));

    if (opts?.dryRun)
        return Promise.resolve(void 0);

    return execaCommand(cmd, opts)
        .then((spawned) => (
            opts?.abbrev
                ? spawned?.stdout
                : spawned
        ))
        .catch(e => {
            if (opts?.throwOnError ?? true)
                throw new Error(
                    c.red(`Running ${c.bold([cmd].join(' '))} in ${c.underline(opts?.cwd || e?.cwd || process.cwd())}:`) +
                    (e.stderr || e.stack || e.message),
                );
            return Promise.resolve(void 0);
        });
}

/**
 * Execute a command synchronously (string)
 * @param cmd
 * @param opts
 */
export function execCommandSync(
    cmd: string,
    opts?: ExecSyncOptions,
) {
    if (opts?.logger || opts?.dryRun)
        console.log(c.green(`> ${[cmd].join(' ')}`));

    if (opts?.dryRun)
        return void 0;

    try {
        const spawned = execaCommandSync(cmd, opts);

        return opts?.abbrev
            ? spawned?.stdout
            : spawned;
    } catch (e) {
        if (opts?.throwOnError ?? true)
            throw new Error(
                c.red(`Running ${c.bold([cmd].join(' '))} in ${c.underline(opts?.cwd || e?.cwd || process.cwd())}:`) +
                (e.stderr || e.stack || e.message),
            );
        return void 0;
    }
}
