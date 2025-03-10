import { resolve } from 'node:path'

import fse from 'fs-extra'
import { execa, Options } from 'execa'
import c from 'ansis'
import { createSpinner } from 'nanospinner'

export interface CommandOptions extends Options {
    logger?: boolean
    throwOnError?: boolean
}

/**
 * Command from execa / execSync
 * @param cmd
 * @param args
 * @param options
 */
export async function execCommand(cmd: string, args: any[], options?: CommandOptions): Promise<any> {
    // const { logger = false, throwOnError = true } = options || {}
    if (options?.logger) console.log(c.green(`> ${[cmd, ...args].join(' ')}`))

    return new Promise(async (resolve, reject) => {
        try {
            const p = await execa(cmd ?? '', args ?? [], options ?? {})

            resolve(p)
        } catch (e: any) {
            if (options?.throwOnError)
                reject(
                    new Error(
                        c.red(
                            `Running ${c.bold([cmd, ...args].join(' '))} in ${c.underline(options?.cwd ?? process.cwd())}:`
                        ) + (e.stderr || e.stack || e.message)
                    )
                )

            resolve(void 0)
        }
    })
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
