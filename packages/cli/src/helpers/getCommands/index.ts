import { formatters } from '@/constants';

interface GetCommandsParams {
  formatter: string | null;
}

export const getCommands = (args: GetCommandsParams): string[] => {
  const { formatter } = args;

  const commands = [
    'pnpm',
    'add',
    '-D',
    'eslint',
    '@eslint/compat',
    '@eslint/js',
    '@elinzy/eslint-config-extended',
  ];

  if (formatter === formatters.PRETTIER) {
    commands.push('prettier', 'eslint-plugin-prettier', 'eslint-config-prettier');
  }

  return commands;
};