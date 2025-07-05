/**
 * Import
 */
import type { ESLint } from 'eslint';

/**
 * Config
 */
const base = {
  get 'recommended-module'(): ESLint.ConfigData {
    return require('./recommended-module').default;
  },
  get 'recommended-script'(): ESLint.ConfigData {
    return require('./recommended-script').default;
  },
  get recommended(): ESLint.ConfigData {
    return require('./recommended').default;
  },
  get typescript(): ESLint.ConfigData {
    return require('./typescript').default;
  },
};

export default base;
