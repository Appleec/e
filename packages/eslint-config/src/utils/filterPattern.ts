export function getDevDeps(extensions = '*') {
  return [
    'test/**', // tape, common npm pattern
    'tests/**', // also common npm pattern
    'spec/**', // mocha, rspec-like pattern
    '**/__tests__/**', // jest pattern
    '**/__mocks__/**', // jest pattern
    `test.{${extensions}}`, // repos with a single test file
    `test-*.{${extensions}}`, // repos with multiple top-level test files
    `**/*{.,_}{test,spec}.{${extensions}}`, // tests where the extension or filename suffix denotes that it is a test
    `**/jest.config.{${extensions}}`, // jest config
    `**/jest.setup.{${extensions}}`, // jest setup
    `**/vue.config.{${extensions}}`, // vue-cli config
    `**/webpack.config.{${extensions}}`, // webpack config
    `**/webpack.config.*.{${extensions}}`, // webpack config
    `**/rollup.config.{${extensions}}`, // rollup config
    `**/rollup.config.*.{${extensions}}`, // rollup config
    `**/gulpfile.{${extensions}}`, // gulp config
    `**/gulpfile.*.{${extensions}}`, // gulp config
    `**/Gruntfile{,.{${extensions}}}`, // grunt config
    `**/protractor.conf.{${extensions}}`, // protractor config
    `**/protractor.conf.*.{${extensions}}`, // protractor config
    `**/karma.conf.{${extensions}}`, // karma config
    `**/.eslintrc.{${extensions}}`, // eslint config
    `**/*.eslint.{${extensions}}`, // eslint config
    `**/eslint.config.{${extensions}}`, // eslint config
    `**/prettier.config.{${extensions}}`, // prettier config
    `**/vite.config.{${extensions}}`, // vite
    `**/tailwind.config.{${extensions}}`, // tailwind
    `**/vitest.config.{${extensions}}`, // vitest
    `**/build.config.{${extensions}}`, // vitest
  ];
}
