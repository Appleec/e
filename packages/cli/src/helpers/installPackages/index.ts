import spawn from 'cross-spawn';

import { getCommands } from '@/helpers/getCommands';

export const installPackages = async (args: {
  formatter: string | null;
}): Promise<void> => {
  const [packageManager, ...commands] = getCommands(args);

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, commands, {
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    });

    child.on('close', (code: number | null) => {
      if (code !== 0) {
        reject(new Error(`${packageManager} ${commands.join(' ')}`, { cause: 'package-failed' }));
        return;
      }
      resolve();
    });
  });
};