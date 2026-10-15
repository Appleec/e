import { Command, Option } from 'commander';

import { eslint } from './index';

import {
  configs,
  eslintConfigName,
  formatters,
  languages,
  legacyConfigs,
  packageManagers,
  runtimes,
  strictConfigs,
  stringBooleans,
} from '@/constants/common';

export const register = (program: Command) => {
  program
    .command('eslint')
    .description('Interactive ESLint config scaffold')

    // Config
    .addOption(
      new Option('--config <config>', 'Explicitly tell the CLI to use selected config.').choices(
        Object.values(configs),
      ),
    )

    // Language
    .addOption(
      new Option(
        '--lang, --language <lang>',
        'Generate configuration for a selected language project.',
      ).choices(Object.values(languages)),
    )

    // Formatters
    .addOption(
      new Option(
        '--formatter <formatter>',
        'Include selected formatter for specific linting rules.',
      ).choices(Object.values(formatters)),
    )

    // Runtimes
    .addOption(
      new Option('--runtime <runtime>', 'Include selected runtime for specific linting rules.')
        .choices(Object.values(runtimes))
        .conflicts(['legacy-config']),
    )

    // Strict Config
    .addOption(
      new Option(
        '--strict, --strict-config <config...>',
        'Include the selected strict ESLint config.',
      )
        .choices(Object.values(strictConfigs))
        .argParser<string[]>((value, previous) => [...new Set([...(previous || []), value])])
        .conflicts(['legacy-config']),
    )

    // Legacy Config
    .addOption(
      new Option('--legacy, --legacy-config <config>', 'Include the selected legacy ESLint config.')
        .choices(Object.values(legacyConfigs))
        .conflicts(['runtime', 'strict-config']),
    )

    // Package Manager
    .addOption(
      new Option(
        '--pm, --package-manager <pm>',
        'Explicitly tell the CLI to use selected package manager.',
      ).choices(Object.values(packageManagers)),
    )

    // Create Eslint File
    .addOption(
      new Option(
        '--create-eslint-file [bool]',
        `Explicitly tell the CLI to create ${eslintConfigName} file.`,
      ).choices(Object.values(stringBooleans)),
    )

    // Skip Install
    .addOption(
      new Option(
        '--skip-install [bool]',
        'Explicitly tell the CLI to skip installing packages.',
      ).choices(Object.values(stringBooleans)),
    )

    .action((options) => {
      eslint(options);
    });
};
