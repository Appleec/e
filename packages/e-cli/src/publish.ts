import prompts from 'prompts'
import { createSpinner } from 'nanospinner'
import * as logger from '@elinzy/e-logger'
import { checkRemoteVersion, execCommand } from './utils/helper'

// Types
export interface PublishOptions {
    packageManager?: string
    checkRemoteVersion?: boolean
    tag?: string
    registry?: string // https://registry.npmjs.org/
}

/**
 * Publish command
 * @param options
 */
publish()
export async function publish(options: PublishOptions = {} ): Promise<void> {
    console.log('options=>', options)
    const { yes: isOk } = await prompts({
        type: 'confirm',
        name: 'yes',
        message: `Publishing the package. Confirm?`,
    })

    if (!isOk)
        return

    // Whether to enable version detection
    if (options?.checkRemoteVersion && (await checkRemoteVersion())) {
        logger.error('Publishing automatically skipped.')
        return
    }

    const s = createSpinner('Publishing the package...').start()

    try {
        await execCommand(
            options?.packageManager ?? 'npm',
            [
                'publish',
                '-r',
                ...['--access', 'public'],
                '--ignore-scripts',
                '--no-git-checks',
                ...(options?.tag ? ['--tag', options?.tag] : []),
                ...(options?.registry ? ['--registry', options?.registry] : []),
            ].filter(Boolean),
        )

        s.success({ text: 'Publish the package successfully' })
    } catch (e: any) {
        logger.error(e)
    }
}
