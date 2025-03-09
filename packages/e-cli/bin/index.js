#!/usr/bin/env node
import { Command } from 'commander'
import fse from 'fs-extra'

import { release, publish, changelog } from '../dist/index.js'

// https://www.npmjs.com/package/commander
const program = new Command()

const pkg = fse.readJsonSync(new URL('../package.json', import.meta.url))

// default
program
    .name(Object.keys(pkg.bin)?.[0])
    .usage('[option] <command>')
    .description(pkg.description)
    .version(pkg.version)

// init command
program
    .command('init').description('init')

// release command
program
    .command('release')
    .description('release all packages')
    .option('-r --remote <remote>', 'remote name', 'origin')
    .option('-b --default-branch <defaultBranch>', 'default branch. main or master')
    .option('-c --check-remote-version <checkRemoteVersion>', 'check remote version')
    .option('--skip-publish <skipPublish>', 'skip npm publish')
    .option('--skip-changelog <skipChangelog>', 'skip generate changelog')
    .option('--skip-git-tag <skipGitTag>', 'skip git tag')
    .option('--skip-npm-tag <skipNpmTag>', 'skip npm tag')
    .action((options) => release(options))

// publish command
program
    .command('publish')
    .description('publish to npm')
    .option('-c --check-remote-version <checkRemoteVersion>', 'check remote version')
    .option('-t --tag <tag>', 'npm tag')
    .option('-r --registry <registry>', 'npm registry')
    .action((options) => publish(options))

// changelog command
program
    .command('changelog')
    .description('Generate changelog')
    .option('-r, --releaseCount <releaseCount>', 'Release count', 0)
    .option('-f, --file <file>', 'Changelog filename', 'CHANGELOG.md')
    .option('-p, --preset <preset>', 'Changelog preset', 'angular')
    .action((options) => changelog(options))

program.parse()
