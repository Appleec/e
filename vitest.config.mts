import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

// https://vitest.zhcndoc.com/guide/
export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias: {
      '@elinzy/e-cli': resolve(__dirname, './packages/e-cli'),
      '@elinzy/e-git': resolve(__dirname, './packages/e-git'),
    },
  },
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'istanbul',
    },
  },
})
