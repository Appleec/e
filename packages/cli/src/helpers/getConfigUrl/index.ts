import {
  configs,
  eslintConfigName,
  formatters,
  languages,
  subFolders,
} from '@/constants';

interface GetConfigUrlParams {
  config: string;
  runtime?: string | null;
  legacyConfig?: string | null;
  formatter?: string | null;
  language: string;
  strictConfig?: string[] | null;
}

export const getConfigUrl = (args: GetConfigUrlParams) => {
  const { config, language, formatter, strictConfig, runtime, legacyConfig } = args;
  const isLegacy = config === configs.LEGACY;

  const prettierText = formatter === formatters.PRETTIER ? 'prettier' : null;
  const tsOrJsText = language === languages.TYPESCRIPT ? 'ts' : 'js';
  const legacyLanguage = config === configs.EXTENDED ? null : legacyConfig;

  const strictOrDefaultText = (() => {
    if (!strictConfig || strictConfig.length === 0) return [subFolders.DEFAULT];
    const strictFolder = [...strictConfig].sort().join('-');
    return [subFolders.STRICT, strictFolder];
  })();

  const path = [
    ...(isLegacy ? [configs.LEGACY, legacyLanguage] : [runtime]),
    prettierText,
    tsOrJsText,
    ...strictOrDefaultText,
    eslintConfigName,
  ]
    .filter(Boolean)
    .join('/');

  return { path };
};