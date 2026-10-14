// Imports
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver } from 'eslint-plugin-import-x';

// Utils
import {
  jsExtensions,
  jsExtensionsWithReact,
  tsExtensionsResolver,
  tsExtensionsWithAll,
} from '@/utils';

// Types
import type { ConfigRaw } from '@/types/common';

export interface GetImportSettingsParams {
  javascript: boolean
  typescript: boolean
  jsx: boolean
}

type GetImportSettings = (params: GetImportSettingsParams) => ConfigRaw['settings'];

export const getImportSettings: GetImportSettings = (params) => {
  const { javascript, typescript, jsx } = params;

  const extensions = (() => {
    if (jsx) {
      if (javascript) return jsExtensionsWithReact;
      if (typescript) return tsExtensionsWithAll;
      return [];
    }

    if (javascript) return jsExtensions;
    if (typescript) return tsExtensionsResolver;
    return [];
  })();

  return {
    'import-x/resolver-next': [
      createNodeResolver({ extensions: [...extensions, '.json'] }),
      ...(typescript
        ? [
            createTypeScriptImportResolver({
              alwaysTryTypes: true,
            }),
          ]
        : []),
    ],
    'import-x/extensions': extensions,
    ...(typescript
      ? {
          // Apply special parsing for TypeScript files
          'import-x/parsers': {
            '@typescript-eslint/parser': extensions,
          },
          // Resolve type definition packages
          'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
        }
      : null),
  };
};


