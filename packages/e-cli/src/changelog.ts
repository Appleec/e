import { resolve as resolvePath } from 'node:path'
import { cwd } from 'node:process'

import fse from 'fs-extra'
import { createSpinner } from 'nanospinner'
import conventionalChangelog from 'conventional-changelog'

// Types
export interface ChangelogOptions {
  file?: string
  releaseCount?: number
  preset?:
    | 'angular'
    | 'atom'
    | 'codemirror'
    | 'conventionalcommits'
    | 'ember'
    | 'eslint'
    | 'express'
    | 'jquery'
    | 'jshint'
}

/**
 * Changelog
 * @param releaseCount
 * @param file
 * @param preset
 */
export function changelog({
  releaseCount = 0,
  file = 'CHANGELOG.md',
  preset = 'angular',
}: ChangelogOptions = {}): Promise<void> {
  const s = createSpinner('Generating changelog').start()

  return new Promise((resolve, reject) => {
    conventionalChangelog({
      preset,
      releaseCount,
    })
      .pipe(fse.createWriteStream(resolvePath(cwd(), file)))
      .on('close', () => {
        s.success('Changelog generated success')
        resolve(void 0)
      })
      .on('error', (err) => {
        s.error('Changelog generated failed')
        reject(err)
      })
  })
}
