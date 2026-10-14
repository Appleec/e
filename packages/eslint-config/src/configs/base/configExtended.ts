// Configs
import { baseConfig } from '@/configs/base/config';

// Rules
import { importsStrictRules } from '@/rules/importsStrict';

export const baseConfigExtended = {
  ...baseConfig,
  importsStrict: importsStrictRules,
} as const;
