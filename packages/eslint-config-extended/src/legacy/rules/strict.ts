import { allFilesExtensions, defineConfigObject } from '@/utils';

export const legacyStrictRules = defineConfigObject({
  name: 'e/config/strict/legacy',
  files: allFilesExtensions,
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
});
