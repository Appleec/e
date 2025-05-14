import { exec } from '@elinzy/e-core'

export async function deleteTag(tagName: string) {
    return await exec('git', ['tag', '--delete', tagName])
}

export async function removeLastCommit() {
    return await exec('git', ['reset', '--hard', 'HEAD~1'])
}

export async function push() {
    return await exec('git', ['push', '--follow-tags'])
}
