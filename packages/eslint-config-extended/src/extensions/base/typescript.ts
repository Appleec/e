// Imports
import { configs } from 'typescript-eslint';

// Helpers
import { getImportSettings } from '@/helpers/getImportSettings';
import { getStylisticLegacyConfig } from '@/helpers/getStylisticLegacyConfig';

// Utils
import {
  defineConfigArray,
  tsExtensionsWithAll,
  tsExtensionsResolver,
  jsExtensionsWithAll,
  extensionsPatternAssigner,
} from '@/utils'

export const baseTypescriptExtensionsConfig = defineConfigArray([
  {
    name: 'e/config/base-typescript-settings-extensions-configurations',
    files: extensionsPatternAssigner([...tsExtensionsResolver]),
    settings: getImportSettings({ javascript: false, typescript: true, jsx: false }),
  },
  {
    name: 'e/config/base-typescript-disable-legacy-stylistic-ts-config',
    files: extensionsPatternAssigner([...tsExtensionsWithAll]),
    ...getStylisticLegacyConfig('typescript'),
  },
  {
    ...configs.disableTypeChecked,
    name: 'e/config/base-typescript-disable-type-checked',
    files: extensionsPatternAssigner([...jsExtensionsWithAll]),
  },
])
