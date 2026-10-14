import fs from 'node:fs';
import path from 'node:path';

import { baseGithubUrl } from './constants';

/**
 * Resolve templates directory from the `@elinzy/build-templates` package.
 * Uses import.meta.resolve to find the package, then reads templates locally.
 */
const templatesDir = (() => {
  // In a pnpm workspace, resolve to the source directory
  const resolvePaths = [
    path.resolve(import.meta.dirname, '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(import.meta.dirname, '..', '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(process.cwd(), 'packages', 'build-templates', 'templates'),
  ];

  for (const p of resolvePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
})();

export const createESLintConfigFile = async (config: {
  configPath: string;
  outputPath: string;
}): Promise<void> => {
  const { configPath, outputPath } = config;

  if (!templatesDir) {
    throw new Error(
      'Cannot find @elinzy/build-templates package. Please ensure it is installed.',
    );
  }

  const templateFile = path.join(templatesDir, configPath);

  if (!fs.existsSync(templateFile)) {
    console.warn(`Template not found: ${configPath}`);
    console.warn(`Searched: ${templateFile}`);
    return;
  }

  const content = fs.readFileSync(templateFile, 'utf8');
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`Created: ${outputPath}`);
  console.log(`Template: ${baseGithubUrl}/${configPath}`);
};

export const baseGithubUrl =
  'https://github.com/Appleec/e/tree/main/packages/build-templates/templates';