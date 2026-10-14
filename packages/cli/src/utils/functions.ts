import pc from 'ansis';

/**
 * Run Function Catch Block
 * @see https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts#L499
 */
export const exit = (error: Error): void => {
  console.log('Aborting installation.')

  if (error.cause === 'package-failed') {
    console.log(`${pc.red(error.message)} has failed.`)
  } else {
    console.log(`${pc.red('Unexpected error. Please report it as a bug:')}\n`, error)
  }

  process.exit(1)
}
