// Helpers
import { getDevDepsList } from '@/helpers/getDevDepsList';

// Utils
// eslint-disable-next-line import-x/no-namespace
import * as extensions from '@/utils/extensionsPattern';

export const helpers = {
  extensions,
  getDevDepsList,
} as const;
