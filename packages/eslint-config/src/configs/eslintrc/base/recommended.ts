/**
 * Import
 */
import { isModule } from '@/utils/checkedModule';
import baseRecommendedScriptConfig from './recommended-script';
import baseRecommendedModuleConfig from './recommended-module';

import type { ESLint } from 'eslint';

const recommendedConfig = isModule() ? baseRecommendedModuleConfig : baseRecommendedScriptConfig;

/**
 * Config
 */
const baseRecommendedConfig = {
  ...recommendedConfig,

  overrides: [
    {
      files: ['*.cjs', '.*.cjs'],
      ...baseRecommendedScriptConfig,
    },
    {
      files: ['*.mjs', '.*.mjs'],
      ...baseRecommendedModuleConfig,
    },
  ],

  rules: {},
} satisfies ESLint.ConfigData;

export default baseRecommendedConfig;
