/**
 * Import
 */
import type eslintrc from '@/configs/eslintrc';
import type flat from '@/configs/flat';

/**
 * Config
 */
const configs = {
  get flat(): Record<keyof typeof flat, any> {
    return require('./flat').default;
  },
  get eslintrc(): Record<keyof typeof eslintrc, any> {
    return require('./eslintrc').default;
  },
};

export default configs;
