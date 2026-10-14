// Utils
import { allFilesExtensions, defineConfigObject } from '@/utils';

// Types
import type { ConfigRules } from '@/types/common';

export const strictInternalRules = {
  // babel inserts `'use strict';` for us
  strict: ['error', 'never'],
} satisfies ConfigRules;

export const strictRules = defineConfigObject({
  name: 'e/config/strict',
  files: allFilesExtensions,
  rules: strictInternalRules,
});
