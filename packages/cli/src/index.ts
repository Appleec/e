#!/usr/bin/env node

// @ts-ignore
import { name, version } from '../package.json';
import { Command } from 'commander';
import { register as registerEslint } from '@/commands/eslint/register';

const program = new Command()
  .name(name)
  .version(version, '-v, --version', 'Output the current version.')
  .helpOption('-h, --help', 'Display help message.');

registerEslint(program);

program.parse();