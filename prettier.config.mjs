/**
 * https://prettier.io/
 * https://prettier.cn/docs/index.html
 *
 * https://prettier.nodejs.cn/docs/en/configuration.html
 * prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs
 */
export default {
    trailingComma: 'es5', // none
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 120,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'ignore',
    overrides: [
        {
            files: '**/*.{yml,yaml}',
            options: {
                singleQuote: false,
                requirePragma: true,
            },
        },
    ],
}
