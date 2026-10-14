// Utils
import {
  allExtensions,
  jsExtensions,
  extensionsPatternAssigner,
  defineConfigArray,
} from '@/utils';

// Helpers
import { getImportSettings } from '@/helpers/getImportSettings';
import { getStylisticLegacyConfig } from '@/helpers/getStylisticLegacyConfig';

export const baseRecommendedExtensionsConfig = defineConfigArray([
  {
    name: 'e/config/base-configurations',
    files: allExtensions,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
    settings: {
      'import-x/core-modules': [],
      'import-x/ignore': ['node_modules', String.raw`\.(coffee|scss|css|less|hbs|svg|json)$`],
    },
  },
  {
    name: 'e/config/base-settings-extensions-configurations',
    files: extensionsPatternAssigner([...jsExtensions]),
    settings: getImportSettings({ javascript: true, typescript: false, jsx: false }),
  },
  {
    name: 'e/config/base-disable-legacy-stylistic-js-config',
    files: allExtensions,
    ...getStylisticLegacyConfig('javascript'),
  },
])
