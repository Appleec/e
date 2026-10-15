#!/usr/bin/env node

// @ts-ignore
import { name, version } from '../package.json';
import { Command, Option } from 'commander';
import { eslint } from '@/commands/eslint';
import { exit } from '@/utils/functions';

const program = new Command()
  .name(name)
  .version(version, '-v, --version', 'Output the current version.')
  .helpOption('-h, --help', 'Display help message.');

const eslintCmd = program
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
  .action(async (opts) => {
    try {
      await eslint(opts);
    } catch (error) {
      if (error instanceof Error) {
        exit(error);
      } else {
        console.error(error);
      }
    }
  });

program.parse();