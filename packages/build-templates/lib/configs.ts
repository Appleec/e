import { configs, legacyConfigs, runtimes, strictConfigs } from './constants';

import { languagePreferences } from './constants';

import type { Content } from './contentFormatter';
import type { GetContentParams } from './getContent';

// TYPES

type Config = (params: GetContentParams) => Content;

// STARTING COMMENTS

export const startingComments = [
  '/**',
  ' * THIS FILE WAS AUTO-GENERATED.',
  ' * PLEASE DO NOT EDIT IT MANUALLY.',
  ' * ===============================',
  ' * IF YOU COPY THIS INTO AN ESLINT CONFIG, REMOVE THIS COMMENT BLOCK.',
  ' */',
];

// IMPORTS

export const imports: Config = ({ type, configurations, strictConfig }) => {
  const isLegacy = type === configs.LEGACY;
  const hasStrictConfig = strictConfig.length > 0;

  const importStatement = (() => {
    if (isLegacy) return "import { configs } from '@elinzy/eslint-config-extended/legacy';";
    if (hasStrictConfig) {
      return "import { configs, plugins, rules } from '@elinzy/eslint-config-extended';";
    }
    return "import { configs, plugins } from '@elinzy/eslint-config-extended';";
  })();

  return [
    "import path from 'node:path';",
    '',
    "import { includeIgnoreFile } from '@eslint/compat';",
    "import js from '@eslint/js';",
    "import { defineConfig } from 'eslint/config';",
    importStatement,
    ...(configurations.prettier
      ? [
          "import { rules as prettierConfigRules } from 'eslint-config-prettier';",
          "import prettierPlugin from 'eslint-plugin-prettier';",
        ]
      : []),
  ];
};

// GITIGNORE CONFIG

export const gitignoreCode = ["const gitignorePath = path.resolve('.', '.gitignore');"];

// JAVASCRIPT CONFIG

export const jsConfig: Config = ({ type, language, strictConfig }) => {
  const isLegacy = type === configs.LEGACY;
  const hasStrictImportConfig = strictConfig.includes(strictConfigs.IMPORT);

  const jsArray = (() => {
    if (isLegacy) {
      return language === legacyConfigs.BASE
        ? ['// e base recommended config', '...configs.base.recommended,']
        : [];
    }

    return [
      '// Stylistic plugin',
      'plugins.stylistic,',
      '// Import X plugin',
      'plugins.importX,',
      '// e base recommended config',
      '...configs.base.recommended,',
      ...(hasStrictImportConfig ? ['// Strict import rules', 'rules.base.importsStrict,'] : []),
    ];
  })();

  return [
    'const jsConfig = defineConfig([',
    [
      '// ESLint recommended config',
      '{',
      ["name: 'js/config',", '...js.configs.recommended,'],
      '},',
      ...jsArray,
    ],
    ']);',
  ];
};

// REACT & NEXT CONFIG

export const reactConfig: Config = ({ type, language, strictConfig }) => {
  const isLegacy = type === configs.LEGACY;
  const isNextJs = language === runtimes.NEXT;
  const hasStrictReactConfig = strictConfig.includes(strictConfigs.REACT);

  const reactArray = [
    '// React plugin',
    'plugins.react,',
    '// React hooks plugin',
    'plugins.reactHooks,',
    '// React JSX A11y plugin',
    'plugins.reactA11y,',
  ];

  const nextArray = ['// Next.js plugin', 'plugins.next,'];

  const legacyArray = [
    'const reactConfig = defineConfig([',
    ['// e React recommended config', '...configs.react.recommended,'],
    language === legacyConfigs.REACT_HOOKS
      ? ['// e React hooks config', '...configs.react.hooks,']
      : [],
    ']);',
  ];

  const extendedArray = [
    `const ${language}Config = defineConfig([`,
    [
      ...reactArray,
      ...(isNextJs ? nextArray : []),
      `// e ${isNextJs ? 'Next.js' : 'React'} recommended config`,
      `...configs.${language}.recommended,`,
      ...(hasStrictReactConfig ? ['// Strict React rules', 'rules.react.strict,'] : []),
    ],
    ']);',
  ];

  return isLegacy ? legacyArray : extendedArray;
};

// NODE CONFIG

export const nodeConfig = [
  'const nodeConfig = defineConfig([',
  [
    '// Node plugin',
    'plugins.node,',
    '// e Node recommended config',
    '...configs.node.recommended,',
  ],
  ']);',
];

// TYPESCRIPT CONFIG

export const typescriptConfig: Config = ({ type, language, strictConfig }) => {
  const isLegacy = type === configs.LEGACY;
  const reactArray = ['// e React TypeScript config', '...configs.react.typescript,'];
  const nextArray = ['// e Next.js TypeScript config', '...configs.next.typescript,'];
  const hasStrictTypescriptConfig = strictConfig.includes(strictConfigs.TYPESCRIPT);

  const legacyArray = [
    'const typescriptConfig = defineConfig([',
    language === legacyConfigs.BASE
      ? ['// e base TypeScript config', '...configs.base.typescript,']
      : ['// e React TypeScript config', '...configs.react.typescript,'],
    ']);',
  ];

  const extendedArray = [
    'const typescriptConfig = defineConfig([',
    [
      '// TypeScript ESLint plugin',
      'plugins.typescriptEslint,',
      '// e base TypeScript config',
      '...configs.base.typescript,',
      ...(hasStrictTypescriptConfig
        ? ['// Strict TypeScript rules', 'rules.typescript.typescriptEslintStrict,']
        : []),
      ...(language === runtimes.REACT ? reactArray : []),
      ...(language === runtimes.NEXT ? nextArray : []),
    ],
    ']);',
  ];

  return isLegacy ? legacyArray : extendedArray;
};

// Prettier Config

export const prettierConfig = [
  'const prettierConfig = defineConfig([',
  [
    '// Prettier plugin',
    '{',
    ["name: 'prettier/plugin/config',", 'plugins: {', ['prettier: prettierPlugin,'], '},'],
    '},',
  ],
  [
    '// Prettier config',
    '{',
    [
      "name: 'prettier/config',",
      'rules: {',
      ['...prettierConfigRules,', "'prettier/prettier': 'error',"],
      '},',
    ],
    '},',
  ],
  ']);',
];

// DEFAULT CONFIG

export const defaultConfig: Config = ({ type, language, languagePreference, configurations }) => {
  const isLegacy = type === configs.LEGACY;

  const reactArray = ['// React config', '...reactConfig,'];
  const nextArray = ['// Next.js config', '...nextConfig,'];
  const typescriptArray = ['// TypeScript config', '...typescriptConfig,'];
  const nodeArray = ['// Node config', '...nodeConfig,'];
  const prettierArray = ['// Prettier config', '...prettierConfig,'];

  return [
    'export default defineConfig([',
    [
      '// Ignore files and folders listed in .gitignore',
      'includeIgnoreFile(gitignorePath),',
      '// JavaScript config',
      '...jsConfig,',
      ...((isLegacy &&
        ([legacyConfigs.REACT, legacyConfigs.REACT_HOOKS] as string[]).includes(language)) ||
      (!isLegacy && language === runtimes.REACT)
        ? reactArray
        : []),
      ...(!isLegacy && language === runtimes.NEXT ? nextArray : []),
      ...(!isLegacy && language === runtimes.NODE ? nodeArray : []),
      ...(languagePreference === languagePreferences.TYPESCRIPT ? typescriptArray : []),
      ...(configurations.prettier ? prettierArray : []),
    ],
    ']);',
  ];
};
