import {
  configs,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
} from '@/constants';

interface EslintArgs {
  config: string | null;
  language: string | null;
  formatter: string | null;
  runtime: string | null;
  strictConfig: string[] | null;
  legacyConfig: string | null;
}

/**
 * Parse CLI flags for the eslint command.
 * Accepts a Commander Command and adds all eslint-specific options.
 */
export const getEslintArgs = (opts: Record<string, any> = {}): EslintArgs => {
  const getConfig = () => {
    const { config } = opts;
    if (config === configs.EXTENDED) return configs.EXTENDED;
    if (config === configs.LEGACY) return configs.LEGACY;
    return null;
  };

  const getLanguage = () => {
    const { language, lang } = opts;
    const value = language || lang;
    if (value === languages.JAVASCRIPT) return languages.JAVASCRIPT;
    if (value === languages.TYPESCRIPT) return languages.TYPESCRIPT;
    return null;
  };

  const getFormatter = () => {
    const { formatter } = opts;
    if (formatter === formatters.NONE) return formatters.NONE;
    if (formatter === formatters.PRETTIER) return formatters.PRETTIER;
    return null;
  };

  const getRuntime = () => {
    const { runtime } = opts;
    if (runtime === runtimes.REACT) return runtimes.REACT;
    if (runtime === runtimes.NEXT) return runtimes.NEXT;
    if (runtime === runtimes.NODE) return runtimes.NODE;
    return null;
  };

  const getStrictConfig = () => {
    const { strict, strictConfig } = opts;
    const value = strict || strictConfig;
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return null;
  };

  const getLegacyConfig = () => {
    const { legacy, legacyConfig } = opts;
    const value = legacy || legacyConfig;
    if (value === legacyConfigs.BASE) return legacyConfigs.BASE;
    if (value === legacyConfigs.REACT) return legacyConfigs.REACT;
    if (value === legacyConfigs.REACT_HOOKS) return legacyConfigs.REACT_HOOKS;
    return null;
  };

  return {
    config: getConfig(),
    language: getLanguage(),
    formatter: getFormatter(),
    runtime: getRuntime(),
    strictConfig: getStrictConfig(),
    legacyConfig: getLegacyConfig(),
  };
};