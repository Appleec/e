import type { ReleaseType } from './version';
import type { VersionBumpOptions } from './types';
import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { glob } from 'tinyglobby';
import yaml from 'yaml';
import { isReleaseType } from './version';

/**
 * A specific version release.
 */
export interface VersionRelease {
  type: 'version';
  version: string;
}

/**
 * Prompt the user for the release number.
 */
export interface PromptRelease {
  type: 'prompt';
  preid: string;
}

/**
 * A bump release, relative to the current version number.
 */
export interface BumpRelease {
  type: ReleaseType;
  preid: string;
}

/**
 * One of the possible Release types.
 */
export type Release = VersionRelease | PromptRelease | BumpRelease;

/**
 * Normalized and sanitized options
 */
export interface NormalizedOptions {
  release: Release;
  commit?: {
    message: string;
    noVerify: boolean;
    all: boolean;
  };
  tag?: {
    name: string;
  };
  sign: boolean;
  push: boolean;
  confirm: boolean;
  files: string[];
  cwd: string;
  ignoreScripts: boolean;
  recursive?: boolean;
  printCommits: boolean;
  install: boolean;
  execute?: string;
  currentVersion?: string;
}

/**
 * The default files to update.
 */
export const defaultFiles = [
  'package.json',
  'package-lock.json',
  'jsr.json',
  'jsr.jsonc',
  'deno.json',
  'deno.jsonc',
];

/**
 * Converts raw VersionBumpOptions to a normalized and sanitized Options object.
 */
export async function normalizeOptions(raw: VersionBumpOptions): Promise<NormalizedOptions> {
  // Set the simple properties first
  const preid = typeof raw.preid === 'string' ? raw.preid : 'beta';
  const sign = Boolean(raw.sign);
  const push = raw.push === undefined ? true : Boolean(raw.push);
  const all = Boolean(raw.all);
  const confirm = raw.confirm === undefined ? true : Boolean(raw.confirm);
  const noVerify = Boolean(raw.noVerify);
  const cwd = raw.cwd || process.cwd();
  const ignoreScripts = Boolean(raw.ignoreScripts);

  let release: Release;
  if (!raw.release || raw.release === 'prompt') {
    release = { type: 'prompt', preid };
  } else if (isReleaseType(raw.release)) {
    release = { type: raw.release, preid };
  } else {
    release = { type: 'version', version: raw.release };
  }

  // `undefined` means "use the default", which is enabled (`true`)
  const rawTag = raw.tag === undefined ? true : raw.tag;
  let tag;
  if (typeof rawTag === 'string') tag = { name: rawTag };
  else if (rawTag) tag = { name: 'v' };

  // NOTE: This must come AFTER `tag` and `push`, because it relies on them
  // `undefined` means "use the default", which is enabled (`true`)
  const rawCommit = raw.commit === undefined ? true : raw.commit;
  let commit;
  if (typeof rawCommit === 'string') {
    commit = { all, noVerify, message: rawCommit };
  } else if (rawCommit || tag || push) {
    commit = { all, noVerify, message: 'chore: release v' };
  }

  const files = await glob(resolveFiles(raw, cwd), {
    cwd,
    onlyFiles: true,
    expandDirectories: false,
    ignore: ['**/{.git,node_modules,bower_components,__tests__,fixtures,fixture}/**'],
  });

  return {
    release,
    commit,
    tag,
    sign,
    push,
    confirm,
    files,
    cwd,
    ignoreScripts,
    recursive: raw.recursive && !raw.files?.length,
    printCommits: raw.printCommits ?? true,
    install: Boolean(raw.install),
    execute: raw.execute,
    currentVersion: raw.currentVersion,
  };
}

/**
 * Resolves the files to update. When `recursive` is set and no explicit files
 * are given, expands the default manifests with every workspace's
 * package.json (from pnpm-workspace.yaml and the `workspaces` field).
 */
function resolveFiles(raw: VersionBumpOptions, cwd: string): string[] {
  if (raw.files?.length) return raw.files;

  const files = [...defaultFiles];

  if (!raw.recursive) return files;

  const workspaces: string[] = [];

  // pnpm workspaces (pnpm-workspace.yaml)
  const pnpmWorkspacePath = `${cwd}/pnpm-workspace.yaml`;
  if (existsSync(pnpmWorkspacePath)) {
    const pnpmWorkspace = yaml.parse(readFileSync(pnpmWorkspacePath, 'utf8')) as {
      packages?: string[];
    };
    workspaces.push(...(pnpmWorkspace.packages ?? []));
  }

  // npm/bun workspaces (package.json `workspaces` field)
  const packageJsonPath = `${cwd}/package.json`;
  if (existsSync(packageJsonPath)) {
    type PKGWorkspaces = string[] | { packages?: string[] };
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
      workspaces?: PKGWorkspaces;
    };
    workspaces.push(
      ...(Array.isArray(packageJson.workspaces)
        ? packageJson.workspaces
        : packageJson.workspaces && Array.isArray(packageJson.workspaces.packages)
          ? packageJson.workspaces.packages
          : []),
    );
  }

  // Skip entries starting with `!` (exclusions) and ones already covered
  const workspaceFiles = workspaces
    .map((workspace) => `${workspace}/package.json`)
    .filter((workspace) => !workspace.startsWith('!') && !files.includes(workspace));

  return [...files, ...workspaceFiles];
}
