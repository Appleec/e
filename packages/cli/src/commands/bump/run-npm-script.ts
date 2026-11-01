import type { Manifest } from './manifest';
import type { Operation } from './operation';
import type { NpmScript } from './types';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { exec } from '@elinzy/core';
import { readJsoncFile } from './fs';
import { isManifest } from './manifest';
import { ProgressEvent } from './types';

/**
 * Runs the specified NPM script in the package.json file.
 */
export async function runNpmScript(script: NpmScript, operation: Operation): Promise<Operation> {
  const { cwd, ignoreScripts } = operation.options;

  if (!ignoreScripts && existsSync(path.join(cwd, 'package.json'))) {
    const { data: manifest } = await readJsoncFile('package.json', cwd);

    if (isManifest(manifest) && hasScript(manifest, script)) {
      await exec('npm', ['run', script, '--silent'], { stdio: 'inherit' });
      operation.update({ event: ProgressEvent.NpmScript, script });
    }
  }

  return operation;
}

/**
 * Determines whether the specified NPM script exists in the given manifest.
 */
function hasScript(manifest: Manifest, script: NpmScript): boolean {
  const scripts = manifest.scripts as Record<NpmScript, string> | undefined;

  if (scripts && typeof scripts === 'object') return Boolean(scripts[script]);

  return false;
}
