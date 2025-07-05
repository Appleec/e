/**
 * Import
 */
import type { Linter } from 'eslint';

/**
 * Config
 */
const plugins = {
  get importX(): Linter.Config {
    return require('./importXPlugin').default;
  },
  get import(): Linter.Config {
    return require('./importPlugin').default;
  },
  get nodeN(): Linter.Config {
    return require('./nodeNPlugin').default;
  },
  get typescriptEslint(): Linter.Config {
    return require('./typescriptEslintPlugin').default;
  },
};

export default plugins;
