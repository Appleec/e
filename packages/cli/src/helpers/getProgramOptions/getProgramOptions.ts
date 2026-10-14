// Imports
import { Command, Option } from 'commander'

// https://www.npmjs.com/package/commander

// Data
// @ts-ignore
import { name, version } from '../../../package.json';

export const getProgramOptions = () => {
  console.log('=>getProgramOptions',);

  const program = new Command()
    .name(name)
    .version(version, '-v, --version', 'Output the current version of create-airbnb-x-config.')
    .helpOption('-h, --help', 'Display this help message.')

    // Config
    // .addOption(
    //   new Option('--config <config>', 'Explicitly tell the CLI to use selected config.')
    // )

  // Core options
  const opts = program.parse().opts();

  // Program options
  const programOptions = {
    // ...opts,
  }

  return programOptions
}
