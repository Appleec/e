/**
 * https://eslint.org/docs/latest/use/configure/migration-guide
 * https://eslint.org/docs/latest/use/configure/
 *
 * Tip: eslint9 not support `.eslintignore`,
 * need to config `eslint.config.js` in `ignore` or `ignorePattern` options.
 */
export default [
    // Default configuration
    {
        name: 'global',
        languageOptions: {
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false
            }
        },
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        rules: {},
    },
    // Ignore
    {
        ignores: [
            'node_modules',
            'build',
            'dist',
            'docs',
        ],
    },
]
