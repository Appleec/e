// Configs
import { typescriptConfig } from '@/configs/typescript/config';

// Rules
import { typescriptEslintStrictRules } from '@/rules/typescript/typescriptEslintStrict';

export const typescriptConfigExtended = {
  ...typescriptConfig,
  typescriptEslintStrict: typescriptEslintStrictRules,
} as const;
