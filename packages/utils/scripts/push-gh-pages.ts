import { config } from 'dotenv';
import { printStep, printAssets, run, DIR_DOCS_DIST } from './utils';

// ENV configuration
config();

const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

/**
 * main
 */
async function main() {
  // Build the package
  printStep('Build the package');
  await run('npm', ['run', 'docs:build']);
  printAssets([DIR_DOCS_DIST], 'created');

  // Commit changes to the Git
  printStep('Commit changes');
  await run('git', ['init'], { cwd: DIR_DOCS_DIST });
  await run('git', ['add', '-A'], { cwd: DIR_DOCS_DIST });
  await run('git', ['commit', '-m', 'docs(release): deploy'], { cwd: DIR_DOCS_DIST });

  // Push to GitHub
  printStep('Pushing to GitHub');
  // Default branch is `main` or `master`, repo https://[username]:[token]@github.com/[username]/[repo_name].git
  await run('git', [
    'push',
    '-f',
    `https://Appleec:${GITHUB_TOKEN}@github.com/Appleec/e-utils.git`,
    'main:gh-pages',
  ], { cwd: DIR_DOCS_DIST });
}

main().catch((err) => console.error(err));

