import { resolve } from 'node:path'

import fse from 'fs-extra'
import { execa, type Options as ExecaOptions } from 'execa'

import c from 'ansis'
import { createSpinner } from 'nanospinner'

export interface CommandOptions extends ExecaOptions {
    abbrev?: boolean
    logger?: boolean
    debug?: boolean
    throwOnError?: boolean
}

/**
 * Command from execa / execSync
 *
 * https://github.com/themartec/execa/blob/main/docs/typescript.md
 * @param cmd
 * @param args
 * @param opts
 */
export async function execCommand(cmd: string = '', args: string[] = [], opts?: CommandOptions): Promise<any> {
    if (opts?.logger)
        console.log(c.green(`> ${[cmd, ...args].join(' ')}`))

    if (opts?.debug)
        return

    try {
        const r = await execa(cmd, args)

        return opts?.abbrev ? (r.stdout ?? '') : (r ?? {})
    } catch (e) {
        if (!opts?.throwOnError)
            throw new Error(
                c.red(`Running ${c.bold([cmd, ...args].join(' '))} in ${c.underline(e.cwd || opts?.cwd || process.cwd())}:`) +
                    (e.stderr || e.stack || e.message)
            )

        return void 0
    }
}

/**
 * Check if the local version is the same as the remote version
 */
export async function checkRemoteVersion(version?: string) {
    const s = createSpinner('Check remote version...').start()

    const { config } = getManifestConfig()

    try {
        await execCommand('npm', ['view', `${config.name}@${version ?? config.version}`, 'version'])

        s.warn({
            text: `The npm package has a same remote version ${config.version}.`,
        })

        return true
    } catch (e) {
        s.success()
        return false
    }
}

/**
 * Get manifest configuration
 * eg. package.json package-lock.json
 */
export function getManifestConfig() {
    const filePath = resolve(process.cwd(), 'package.json')

    return {
        config: fse.readJSONSync(filePath) as {
            name: string
            version: string
            private: boolean
        },
        filePath,
    }
}
