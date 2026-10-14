import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Cache from './Cache';

const cache = new Cache();

export function readPackageJson(basePath) {
  const filePath = path.join(basePath, 'package.json');

  if (!filePath) return null;

  try {
    const text = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(text);
    if (
      data != null &&
      typeof data === 'object' &&
      Array.isArray(data) === false
    ) {
      data.filePath = filePath;
      return data;
    }
  } catch (error) {
    const exception = (error);
    if (exception.code !== 'ENOENT') {
      throw exception;
    }
  }
  return null;
}

export function getPackageJson(basePath = '') {
  const startDir = path.dirname(path.resolve(basePath));
  let dir = startDir;
  let prevDir = '';
  let data = null;
  do {
    data = cache.get(dir);
    if (data) {
      if (dir !== startDir) {
        cache.set(startDir, data);
      }
      return data;
    }

    data = readPackageJson(dir);
    if (data) {
      cache.set(dir, data);
      cache.set(startDir, data);
      return data;
    }

    // Go to next.
    prevDir = dir;
    dir = path.resolve(dir, '..');
  } while (dir !== prevDir);

  cache.set(startDir, null);
  return null;
}

export function isModule() {
  const data = getPackageJson() as any;

  return data != null &&
    typeof data === 'object' &&
    'type' in data &&
    data.type === 'module';
}
