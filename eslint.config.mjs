import tsEslint from 'typescript-eslint'
import eslint from '@eslint/js'
import pluginN from 'eslint-plugin-n'
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
        ignores: ['**/node_modules/**', '**/dist/**', '**/docs/**'],
    },
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        name: 'main',
        languageOptions: {
            parser: tsEslint.parser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2022,
                project: ['./packages/*/tsconfig.json'],
            },
            globals: {
                ...globals.es2021,
                ...globals.node,
            },
        },
        plugins: {
            n: pluginN,
        },
        rules: {
            eqeqeq: ['warn', 'always', { null: 'never' }],
            'no-debugger': ['error'],
            'no-empty': ['warn', { allowEmptyCatch: true }],
            'no-process-exit': 'off',
            'no-useless-escape': 'off',
            'prefer-const': [
                'warn',
                {
                    destructuring: 'all',
                },
            ],
            'no-async-promise-executor': 'off',
            'n/no-missing-import': 'off', // doesn't like ts imports
            'n/no-process-exit': 'off',
            '@typescript-eslint/no-explicit-any': 'off', // we use any in some places
            '@typescript-eslint/no-unused-vars': 'off',
        },
    }
)
