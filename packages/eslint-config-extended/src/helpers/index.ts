// Helpers
import { getDevDepsList } from '@/helpers/getDevDepsList';
import { getImportSettings } from '@/helpers/getImportSettings';
import { getStylisticLegacyConfig } from '@/helpers/getStylisticLegacyConfig';

// Utils
// eslint-disable-next-line import-x/no-namespace
import * as extensions from '@/utils/extensionsPattern';

export const helpers = {
  extensions,
  getDevDepsList,
  getImportSettings,
  getStylisticLegacyConfig,
} as const;
