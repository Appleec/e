// import { findUpSync } from 'find-up-simple';
import fs from 'node:fs';
import path from 'node:path';

import Cache from './Cache';

const cache = new Cache();

/**
 * Find package.json file and convert to json format
 */
function readPackageJson(dir) {
  const filePath = path.join(dir, 'package.json');
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
  } catch (e) {
    // do nothing
  }
  return null;
}

/**
 * Get package.json
 * @param startPath
 */
function getPackageJson(startPath = 'a.js') {
  const startDir = path.dirname(path.resolve(startPath));
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

/**
 * Check package.json type
 */
export function isModule() {
  const data: any = getPackageJson();
  return (
    data != null &&
    typeof data === 'object' &&
    'type' in data &&
    data.type === 'module'
  );
}
