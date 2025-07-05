import { createAssigner } from '../utils/createAssigner';

/**
 * warn
 */
export const warn = createAssigner(
  {
    type: 'warn',
    color: 'yellow',
  },
);
