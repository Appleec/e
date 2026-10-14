#!/usr/bin/env node

// Utils
import { exit } from '@/utils/functions';

// @ts-ignore
import { name, version } from '../package.json';
import { Command } from 'commander';
import { eslint } from '@/commands/eslint';

const program = new Command()
  .name(name)
  .version(version, '-v, --version', 'Output the current version.')
  .helpOption('-h, --help', 'Display help message.');

program
  .command('eslint')
  .description('Interactive ESLint config scaffold')
  .action(async () => {
    try {
      await eslint();
    } catch (error) {
      if (error instanceof Error) {
        exit(error);
      } else {
        console.error(error);
      }
    }
  });

program.parse();