import type { GitCommit } from 'tiny-conventional-commits-parser';
import pc from 'ansis';

const messageColorMap: Record<string, (s: string) => string> = {
  feat: pc.green,
  feature: pc.green,

  refactor: pc.cyan,
  style: pc.cyan,

  docs: pc.blue,
  doc: pc.blue,
  types: pc.blue,
  type: pc.blue,

  chore: pc.gray,
  ci: pc.gray,
  build: pc.gray,
  deps: pc.gray,
  dev: pc.gray,

  fix: pc.yellow,
  test: pc.yellow,

  perf: pc.magenta,

  revert: pc.red,
  breaking: pc.red,
};

export function formatParsedCommits(commits: GitCommit[]) {
  const typeLength = commits.map(({ type }) => type.length).reduce((a, b) => Math.max(a, b), 0);
  const scopeLength = commits.map(({ scope }) => scope.length).reduce((a, b) => Math.max(a, b), 0);

  return commits.map((commit) => {
    let color = messageColorMap[commit.type] ?? ((s: string) => s);
    if (commit.isBreaking) {
      color = (s: string) => pc.bgRed(s);
    }

    const paddedType = commit.type.padStart(typeLength + 1, ' ');
    const paddedScope = !commit.scope
      ? ' '.repeat(scopeLength ? scopeLength + 2 : 0)
      : pc.dim('(') + commit.scope + pc.dim(')') + ' '.repeat(scopeLength - commit.scope.length);

    return [
      pc.dim(commit.shortHash),
      ' ',
      color === pc.gray ? color(paddedType) : pc.bold(color(paddedType)),
      ' ',
      paddedScope,
      pc.dim(':'),
      ' ',
      color === pc.gray ? color(commit.description) : commit.description,
    ].join('');
  });
}

export function printRecentCommits(commits: GitCommit[]): void {
  if (!commits.length) {
    console.log();
    console.log(`${pc.blue('i')}${pc.gray(' No commits since the last version')}`);
    console.log();
    return;
  }

  const prettified = formatParsedCommits(commits);

  console.log();
  console.log(pc.bold(`${pc.green(String(commits.length))} Commits since the last version:`));
  console.log();
  console.log(prettified.join('\n'));
  console.log();
}
