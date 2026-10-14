import plugin from 'eslint-plugin-react-hooks';

import { allFilesExtensions, defineConfigObject } from '@/utils';

import type { ConfigPluginObject } from '@/types/common';

export const legacyReactHooksRules = defineConfigObject({
  name: 'e/config/react-hooks/legacy',
  files: allFilesExtensions,
  plugins: {
    'react-hooks': plugin,
  } as ConfigPluginObject,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    // Validates that dependency arrays for React hooks contain all necessary dependencies.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
    'react-hooks/exhaustive-deps': 'error',

    // Validates that components and hooks follow the Rules of Hooks.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
    'react-hooks/rules-of-hooks': 'error',
  },
});
