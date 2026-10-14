// Imports
import nodePlugin from 'eslint-plugin-n';

// Utils
import { allFilesExtensions, defineConfigArray } from '@/utils';

// Rules
import { nodeNoUnsupportedFeaturesInternalRules } from '@/rules/node/nodeNoUnsupportedFeatures';

// Data
const flatNodeConfig = nodePlugin.configs['flat/recommended'];
const flatModuleConfig = nodePlugin.configs['flat/recommended-module'];
const flatScriptConfig = nodePlugin.configs['flat/recommended-script'];

export const nodeRecommendedExtensionsConfig = defineConfigArray([
   {
    name: 'e/config/node-configurations',
    files: allFilesExtensions,
    ...(flatNodeConfig
      ? {
          languageOptions: flatNodeConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatNodeConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
   {
    name: 'e/config/node-configurations-for-module',
    files: ['**/*.mjs', '**/*.mts'],
    ...(flatModuleConfig
      ? {
          languageOptions: flatModuleConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatModuleConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
   {
    name: 'e/config/node-configurations-for-script',
    files: ['**/*.cjs', '**/*.cts'],
    ...(flatScriptConfig
      ? {
          languageOptions: flatScriptConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatScriptConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
]);
