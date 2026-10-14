# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`@elinzy/e` 是一个 pnpm monorepo，提供一套管理多包仓库的脚本与命令工具。入口 CLI 为 `e` / `e-cli`。各包源码均使用 TypeScript + ESM (`"type": "module"`) 编写。

## 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发模式（监听）
pnpm dev

# 运行所有测试
pnpm test

# 运行单个测试文件
pnpm vitest run packages/<pkg>/src/<file>.test.ts

# 测试UI + 覆盖率
pnpm test:report

# Lint / 格式化
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:fix

# 构建单个包（在该包目录下）
cd packages/<pkg> && pnpm build
```

## 架构总览

### 包依赖层级

```
types          — 共享 TypeScript 类型（EPackage, ENullable, EArrayable 等，零依赖）
errors         — 自定义 Error 类（GitError, ValidationError, ExitError, InternalError）
logger         — 带颜色/符号的终端日志（基于 ansis，通过 createAssigner 工厂创建）
core           — Node.js 运行时基元：进程执行 + 文件操作 + 终端输出 + ansis 颜色重导出
git            — Git 操作封装（repo/branch/tag/changed/action），构建于 core 之上
utils          — Lodash 风格工具库（~170 文件，12 大分类），完全独立
cli            — CLI 入口 `e` / `e-cli`（基于 Commander.js，依赖 core + logger）
tsconfig       — 共享 tsconfig 预设（Vue/React/Node/Next 等多种变体）
eslint-config  — 共享 ESLint flat config（插件体系：stylistic, typescript-eslint, import-x, n, promise）
eslint-config-extended — eslint-config 的扩展版（同名 npm 包，更严格的规则集）
```

运行时依赖链：`errors → logger / core / utils → git → cli`。`types`、`tsconfig`、`eslint-config` 为纯配置/类型层。

### 构建系统

- **打包**: 每个包使用 **Rollup**，共享 root 的 `rollup.base.mjs`（定义 common/esm/cjs/dts 四个 config）。每个包自己的 `rollup.config.mjs` 传入具体配置。
- **输出**: 每个包生成 `dist/`，包含 `.mjs` (ESM)、`.cjs` (CJS)、`.d.ts` (类型声明)。
- **类型**: 通过 `tsc --emitDeclarationOnly` 单独生成。
- **版本管理**: 使用 Changesets (`@changesets/cli`)，发布到 npm (public access)。

### TypeScript 配置

- `tsconfig.base.json`（root）：extends `@elinzy/tsconfig`，设置 `module: ESNext`、`moduleResolution: Bundler`、`strict`。
- `tsconfig.eslint.json`：extends `tsconfig.base.json`，仅 include `packages`、`scripts`、`vitest.config.mts`。
- `packages/tsconfig/`：提供多种预设（Vue、React、Node、Next 等），被各包通过 `@elinzy/tsconfig` 引用。

### ESLint 配置

- Root `eslint.config.mjs` 使用 `@elinzy/eslint-config` 的 flat config presets（base/recommended、base/typescript、node/recommended）。
- `packages/eslint-config` 导出 `configs`（base、node）、`extensions`、`helpers`、`plugins`、`rules` 五个命名空间。

### 测试

- 使用 **Vitest**，root `vitest.config.mts` 定义。
- 覆盖率工具：Istanbul provider。
- 测试文件命名：`*.test.ts` / `*.spec.ts`，位于各包 `src/` 内。

## 关键约定

- 所有包 `type: "module"`，源码使用 ESM import/export。
- Node 引用使用 `node:` 前缀（如 `node:path`、`node:module`）。
- CLI 入口 `packages/cli` 的 bin 为 `e` 和 `e-cli`，指向 `dist/index.mjs`。
- `core` 使用 `execa` 的同步/异步变体，在此基础上增加了 `abbrev`（仅返回 stdout）、`logger`（打印命令）、`dryRun`（空执行）选项。同时导出 `fs` 工具（`readJSONFileSync`、`writeJSONFileSync` 等）、`print` 工具（`printStep`、`printValues`），并将整个 `ansis` 作为 `color` 重导出。
- `utils` 是最大包（~170 文件），按功能分 12 大分类：`lang`（类型判断/深拷贝/深比较）、`string`（驼峰/蛇形等）、`array`、`object`、`math`、`number`、`function`（debounce/throttle）、`collection`、`time`、`dom`、`util`、`locale`。`_internal/` 目录为内部辅助模块（Hash、ListCache 等），不直接导出。
- `types` 导出核心泛型（`ENullable<T>`、`EArrayable<T>`、`EAnyFn` 等）、`ERef<T>`（DOM 引用）、`EPackage`（完整 package.json 类型）。
- `logger` 基于 `ansis`，通过 `createAssigner` 工厂创建不同级别的日志函数（done、error、info、warn、success 等），支持 `default`/`text`/`chip`/`tonal`/`outlined` 五种 variant。
- `errors` 基于 `extendable-error`，错误类通过 `instanceof` 可区分。
- Changesets baseBranch 为 `main`，access 为 `public`。