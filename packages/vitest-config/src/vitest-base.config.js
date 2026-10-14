import { defineConfig } from 'vitest/config';

/**
 * @typedef {Object} BaseConfigOptions
 * @property {string} name
 * @property {string} root
 * @property {string[]} coverageInclude
 * @property {number} [testTimeout]
 */

/**
 * @see https://vitest.dev/config/
 * @param {BaseConfigOptions} options
 * @returns {ReturnType<typeof defineConfig>}
 */
export const defineBaseConfig = (options) => {
  const { name, root, coverageInclude, testTimeout } = options;

  return defineConfig({
    resolve: {
      alias: [{ find: /^@\//, replacement: `${root}/` }],
    },
    test: {
      name,
      environment: 'node',
      include: ['tests/**/*.test.ts'],
      ...(testTimeout ? { testTimeout } : null),
      clearMocks: true,
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        include: coverageInclude,
        exclude: ['**/*.types.ts', 'tests/**'],
      },
    },
  });
};