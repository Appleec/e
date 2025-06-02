import { Command } from 'commander';
import fse from 'fs-extra';

import init from './commands/init';

// https://www.npmjs.com/package/commander
const program = new Command();

const pkg = fse.readJsonSync(new URL('../package.json', import.meta.url));

// default
program
  .name(Object.keys(pkg.bin)?.[0])
  .usage('[option] <command>')
  .description(pkg.description)
  .version(pkg.version);

// init command
program
  .command('init')
  .description('init')
  .action((opts) => init(opts));

program
  .parse();
