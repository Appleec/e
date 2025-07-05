import { describe, it } from 'vitest';

import type {
  EPackage,
  EPackageExtension,
} from '../src';

describe('e-types', () => {
  it('should do something', () => {
    const p1: EPackage = {
      name: 'e',
      version: '1.0.0',
    }

    const p2: EPackageExtension = {
      peerDependencies: {},
      dependencies: {},
    }
  });
});
