import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Resolve templates directory from the `@elinzy/build-templates` package.
 */
const resolveTemplatesDir = (): string | null => {
  // Try import.meta.resolve for installed packages (npm/pnpm)
  try {
    const pkgUrl = import.meta.resolve('@elinzy/build-templates/package.json');
    const pkgPath = fileURLToPath(pkgUrl);
    const dir = path.join(path.dirname(pkgPath), 'templates');
    if (fs.existsSync(dir)) return dir;
  } catch {
    // Fall through to workspace paths
  }

  // Workspace fallbacks
  const base = import.meta.dirname;
  const resolvePaths = [
    path.resolve(base, '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(base, '..', '..', '..', '..', 'build-templates', 'templates'),
    path.resolve(process.cwd(), 'packages', 'build-templates', 'templates'),
  ];

  for (const p of resolvePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const templatesDir = resolveTemplatesDir();

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