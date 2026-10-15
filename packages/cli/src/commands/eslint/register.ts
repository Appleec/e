import { Command, Option } from 'commander';

import { eslint } from './index';

export const register = (program: Command) => {
  program
    .command('eslint')
    .description('Interactive ESLint config scaffold')
    .option('--config <config>', 'Config type: extended | legacy')
    .option('--lang, --language <lang>', 'Language: javascript | typescript')
    .option('--formatter <formatter>', 'Formatter: prettier | none')
    .option('--runtime <runtime>', 'Runtime: node | react | next')
    .addOption(
      new Option('--strict [config...]', 'Strict configs: import | react | typescript'),
    )
    .option('--legacy <config>', 'Legacy config: base | react | react-hooks')
    .option('--create-eslint-file [bool]', 'Create eslint.config.mjs file')
    .option('--skip-install [bool]', 'Skip package installation')
    .action(eslint);
};