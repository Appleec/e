// Plugins
import { importXPluginConfig } from '@/plugins/importXPlugin';
import { nodePlugin } from '@/plugins/nodePlugin';
import { stylisticPlugin } from '@/plugins/stylisticPlugin';
import { typescriptEslintPlugin } from '@/plugins/typescriptEslintPlugin';

// @ts-ignore
export const plugins = {
  stylistic: stylisticPlugin,
  importX: importXPluginConfig,
  node: nodePlugin,
  typescriptEslint: typescriptEslintPlugin,
} as const;
