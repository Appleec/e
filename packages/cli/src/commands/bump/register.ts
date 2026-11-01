import { Command, Option } from 'commander';

import { bump } from './index';

import { defaultFiles } from './normalize-options';
import { isValidVersion, isReleaseType } from './version';

export const register = (program: Command) => {
  program
    .command('bump')
    .description('Bump version, commit changes, tag, and push to Git')
    .usage('[release] [files...]')

    // Positional arguments: optional leading release type/version, then files
    .argument(
      '[args...]',
      `Release type or version, then files to update (default: ${defaultFiles.join(', ')})`,
    )

    // Release
    .option(
      '--release <release>',
      `Release type or version number (e.g. 'major', 'minor', 'patch', '1.2.3')`,
    )

    // Preid
    .option('--preid <preid>', 'ID for prerelease (default: beta)')

    // Commit
    .addOption(new Option('-c, --commit [msg]', 'Commit message (default: "chore: release v")'))
    .option('--no-commit', 'Do not create a git commit')

    // Tag
    .addOption(new Option('-t, --tag [name]', 'Tag name (default: v)'))
    .option('--no-tag', 'Do not create a git tag')

    // Push
    .option('-p, --push', 'Push to remote', true)
    .option('--no-push', 'Do not push to remote')

    // Sign
    .option('--sign', 'Sign commit and tag')

    // All
    .option('-a, --all', 'Include all files in the commit')

    // Confirm
    .option('-y, --yes', 'Skip confirmation')

    // Verify
    .option('--no-verify', 'Bypass git commit hooks')

    // Ignore Scripts
    .option('--ignore-scripts', 'Ignore npm version scripts')

    // Quiet
    .option('-q, --quiet', 'Quiet mode')

    // Current Version
    .option('--current-version <version>', 'Current version')

    .action((args: string[], options) => {
      // Strip a leading release type / version number from positional args before
      // passing files to versionBump.
      const files = [...(args || [])];
      let release = options.release;
      if (files.length > 0) {
        const firstArg = files[0];
        if (firstArg === 'prompt' || isReleaseType(firstArg) || isValidVersion(firstArg)) {
          release = release ?? files.shift();
        }
      }

      bump({
        ...options,
        release,
        files: files.length ? files : undefined,
        confirm: !options.yes,
        noVerify: options.verify === false,
      });
    });
};
