import {
  configs,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
  stringBooleans,
} from '@/constants';

// Get Config
const getConfig = (opts: Record<string, any>) => {
  const { config } = opts;
  if (config === configs.EXTENDED) return configs.EXTENDED;
  if (config === configs.LEGACY) return configs.LEGACY;
  return null;
};

// Get Language
const getLanguage = (opts: Record<string, any>) => {
  const { language, lang } = opts;
  const value = language || lang;
  if (value === languages.JAVASCRIPT) return languages.JAVASCRIPT;
  if (value === languages.TYPESCRIPT) return languages.TYPESCRIPT;
  return null;
};

// Get Formatter
const getFormatter = (opts: Record<string, any>) => {
  const { formatter } = opts;
  if (formatter === formatters.NONE) return formatters.NONE;
  if (formatter === formatters.PRETTIER) return formatters.PRETTIER;
  return null;
};

// Get Runtime
const getRuntime = (opts: Record<string, any>) => {
  const { runtime } = opts;
  if (runtime === runtimes.REACT) return runtimes.REACT;
  if (runtime === runtimes.NEXT) return runtimes.NEXT;
  if (runtime === runtimes.NODE) return runtimes.NODE;
  return null;
};

// Get Strict Config
const getStrictConfig = (opts: Record<string, any>) => {
  const { strictConfig } = opts;
  return strictConfig?.length ? strictConfig : null;
};

// Get Legacy Config
const getLegacyConfig = (opts: Record<string, any>) => {
  const { legacyConfig, legacy } = opts;
  const value = legacyConfig || legacy;
  if (value === legacyConfigs.BASE) return legacyConfigs.BASE;
  if (value === legacyConfigs.REACT) return legacyConfigs.REACT;
  if (value === legacyConfigs.REACT_HOOKS) return legacyConfigs.REACT_HOOKS;
  return null;
};

// Get Create Eslint File
const getCreateEslintFile = (opts: Record<string, any>) => {
  const { createEslintFile } = opts;

  if (createEslintFile === undefined) return null;
  return createEslintFile === true || createEslintFile === stringBooleans.TRUE;
};

// Get Skip Install
const getSkipInstall = (opts: Record<string, any>) => {
  const { skipInstall } = opts;

  if (skipInstall === undefined) return null;
  return skipInstall === true || skipInstall === stringBooleans.TRUE;
};

// Get Args
export const getArgs = (opts: Record<string, any> = {}) => ({
  config: getConfig(opts),
  language: getLanguage(opts),
  formatter: getFormatter(opts),
  runtime: getRuntime(opts),
  strictConfig: getStrictConfig(opts),
  legacyConfig: getLegacyConfig(opts),
  createEslintFile: getCreateEslintFile(opts),
  skipInstall: getSkipInstall(opts),
});