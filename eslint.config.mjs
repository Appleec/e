import tsEslint from 'typescript-eslint'
import globals from 'globals'

/**
 * https://eslint.org/docs/latest/use/configure/migration-guide
 * https://eslint.org/docs/latest/use/configure/
 *
 * Tip: eslint9 not support `.eslintignore`,
 * need to config `eslint.config.js` in `ignore` or `ignorePattern` options.
 */
export default tsEslint.config(
    // Ignore
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/docs/**',
        ],
    },
    {
        name: 'main',
        languageOptions: {
            parser: tsEslint.parser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2022,
                warnOnUnsupportedTypeScriptVersion: false,
                project: [
                    './packages/*/tsconfig.json',
                ]
            },
            globals: {
                ...globals.es2021,
                ...globals.node,
            },
        },
        plugins: {},
        rules: {},
    }
)
