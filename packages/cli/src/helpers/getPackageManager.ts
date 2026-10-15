import { detect } from 'package-manager-detector/detect';

import { packageManagers } from '@/constants';

export const getPackageManager = async (): Promise<string> => {
  const pm = await detect();
  if (!pm) return packageManagers.NPM;

  const { name } = pm;

  if (name === packageManagers.PNPM) return packageManagers.PNPM;
  if (name === packageManagers.YARN) return packageManagers.YARN;
  if (name === packageManagers.BUN) return packageManagers.BUN;
  return packageManagers.NPM;
};