#!/usr/bin/env node

// @ts-ignore
import { name, version } from '../package.json';
import { Command } from 'commander';
import { register as registerBump } from '@/commands/bump/register';
import { register as registerEslint } from '@/commands/eslint/register';

const program = new Command()
  .name(name)
  .version(version, '-v, --version', 'Output the current version.')
  .helpOption('-h, --help', 'Display help message.');

// bump
registerBump(program);

// eslint
registerEslint(program);

program.parse();
