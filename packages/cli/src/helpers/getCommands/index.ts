import { formatters, packageManagers } from '@/constants';

interface GetCommandsParams {
  formatter?: string | null;
  packageManager?: string;
}

export const getCommands = (args: GetCommandsParams = {}): string[] => {
  const { formatter, packageManager = packageManagers.PNPM } = args;

  const pmInstallationCommand: Record<string, string> = {
    [packageManagers.NPM]: 'install',
    [packageManagers.YARN]: 'add',
    [packageManagers.PNPM]: 'install',
    [packageManagers.BUN]: 'add',
  };

  const commands = [
    packageManager,
    pmInstallationCommand[packageManager] || 'install',
    '-D',
    'eslint@^9',
    '@eslint/compat',
    '@eslint/js@^9',
    '@elinzy/eslint-config-extended',
  ];

  if (formatter === formatters.PRETTIER) {
    commands.push('prettier', 'eslint-plugin-prettier', 'eslint-config-prettier');
  }

  return commands;
};