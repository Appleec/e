/* eslint-disable */
import {
  existsSync,
  readFileSync as nativeReadFileSync,
  writeFileSync as nativeWriteFileSync,
  mkdirSync,
  type ObjectEncodingOptions,
} from 'node:fs'
import { dirname } from 'node:path';

export type Options = ObjectEncodingOptions & { encoding?: BufferEncoding | null }
export interface WriteToFileOptions {
  encoding?: null
  flag?: string
  cwd?: string
}

/**
 * Read file sync
 * @param filepath
 * @param options
 */
export function readFileSync(filepath: string, options?: Options) {
  if (!filepath) return;
  return existsSync(filepath) ? nativeReadFileSync(filepath, options) : undefined;
}

export function writeFileSync(filePath: string, data: string | NodeJS.ArrayBufferView, options?: WriteToFileOptions) {
  if (!filePath) return
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  if (!existsSync(filePath)) {
    mkdirSync(dirname(filePath), { recursive: true })
  }
  nativeWriteFileSync(filePath, data, options)
}

export function readFileAsNormalizedStrSync(filepath: string, options?: Options) {
  const str = readFileSync(filepath, options);
  return str ? str.toString().replace(/(\r\n|\r|\n)/g, '\n') : undefined;
}

export function readJSONFileSync(filepath: string, options?: Options): any {
  const str = readFileAsNormalizedStrSync(filepath, options);
  return str ? JSON.parse(str) : undefined;
}

export function writeJSONFileSync(filePath: string, data: any, options?: WriteToFileOptions) {
  if (!filePath || !data) return
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  writeFileSync(filePath, data, options)
}
