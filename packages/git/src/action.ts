import { execSync, type ExecSyncResult } from '@elinzy/core';

export function deleteTag(tagName: string) {
  const r = execSync('git', ['tag', '--delete', tagName]) as ExecSyncResult;
  return r.stdout;
}

export async function removeLastCommit() {
  const r = execSync('git', ['reset', '--hard', 'HEAD~1']) as ExecSyncResult;
  return r.stdout;
}

export async function push() {
  const r = execSync('git', ['push', '--follow-tags']) as ExecSyncResult;
  return r.stdout;
}
