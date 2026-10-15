import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { eslintConfigName } from '@/constants';
import { getConfigUrl } from '@/helpers/getConfigUrl';

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

interface ESLintConfigFileArgs {
  config: string;
  language: string;
  formatter?: string | null;
  runtime?: string | null;
  strictConfig?: string[] | null;
  legacyConfig?: string | null;
}

/**
 * Create an ESLint config file from template.
 * Accepts the full args object, internally resolves the template path.
 */
export const createESLintConfigFile = async (args: ESLintConfigFileArgs): Promise<void> => {
  if (!templatesDir) {
    throw new Error('Cannot find @elinzy/build-templates package. Please ensure it is installed.');
  }

  const configUrl = getConfigUrl(args);
  const templateFile = path.join(templatesDir, configUrl.path);

  if (!fs.existsSync(templateFile)) {
    console.warn(`Template not found: ${configUrl.path}`);
    return;
  }

  const content = fs.readFileSync(templateFile, 'utf8');
  const outputPath = path.resolve(process.cwd(), eslintConfigName);
  fs.writeFileSync(outputPath, content, 'utf8');
};