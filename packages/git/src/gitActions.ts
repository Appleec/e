import { exec } from '@elinzy/core';

export async function deleteTag(tagName: string) {
  const r = await exec('git', ['tag', '--delete', tagName]);
  return r?.stdout;
}

export async function removeLastCommit() {
  const r = await exec('git', ['reset', '--hard', 'HEAD~1']);
  return r?.stdout;
}

export async function push() {
  const r = await exec('git', ['push', '--follow-tags']);
  return r?.stdout;
}
