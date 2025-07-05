/**
 * Import
 */
import variantsRules from '@/rules/variants';
import errorsRules from '@/rules/errors';
import es6Rules from '@/rules/es6';
import importsRules from '@/rules/imports/importsXBase';
import strictRules from '@/rules/strict';
import styleRules from '@/rules/style';
import variablesRules from '@/rules/variables';

import type { Linter } from 'eslint';

/**
 * Config
 */
const baseConfig = {
  variants: variantsRules,
  errors: errorsRules,
  es6: es6Rules,
  imports: importsRules,
  strict: strictRules,
  style: styleRules,
  variables: variablesRules,
} satisfies Record<string, Linter.Config>;

export default baseConfig;
