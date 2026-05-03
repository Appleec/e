import { createAssigner } from '../createAssigner';

/**
 * warn
 */
export const warn = createAssigner({
  type: 'warn',
  symbolEnabled: true,
  variant: 'text',
});
