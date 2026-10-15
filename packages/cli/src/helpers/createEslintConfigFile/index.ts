import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fetch from 'node-fetch';

import { baseGithubRawUrl, eslintConfigName } from '@/constants';
import { getConfigUrl } from '@/helpers/getConfigUrl';
import { rootPath } from '@/utils';

/**
 * Resolve templates directory from the `@elinzy/build-templates` package.
 */
const resolveTemplatesDir = (): string | null => {
  try {
    const pkgUrl = import.meta.resolve('@elinzy/build-templates/package.json');
    const pkgPath = fileURLToPath(pkgUrl);
    const dir = path.join(path.dirname(pkgPath), 'templates');
    if (fs.existsSync(dir)) return dir;
  } catch {
    // Fall through to workspace paths
  }

  const base = import.meta.dirname;
  for (const p of [
    path.resolve(base, '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(base, '..', '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(process.cwd(), 'packages', 'build-templates', 'templates'),
  ]) {
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const templatesDir = resolveTemplatesDir();

export const createESLintConfigFile = async (args: {
  config: string;
  language: string;
  formatter?: string | null;
  runtime?: string | null;
  strictConfig?: string[] | null;
  legacyConfig?: string | null;
}): Promise<void> => {
  try {
    const configUrl = getConfigUrl(args);
    if (!configUrl) return;

    const { path: configPath } = configUrl;

    // Try local templates first (from @elinzy/build-templates)
    if (templatesDir) {
      const localFile = path.join(templatesDir, configPath);
      if (fs.existsSync(localFile)) {
        const content = fs.readFileSync(localFile, 'utf8');
        await fsPromise.writeFile(`${rootPath}/${eslintConfigName}`, content, { encoding: 'utf8' });
        return;
      }
    }

    // Fall back to GitHub raw URL
    const url = `${baseGithubRawUrl}/${configPath}`;
    const res = await fetch(url);
    const data = await res.text();

    await fsPromise.writeFile(`${rootPath}/${eslintConfigName}`, data, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  }
};
