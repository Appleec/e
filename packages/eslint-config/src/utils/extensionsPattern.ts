// ::js
export const jsExtensions = ['.js', '.cjs', '.mjs'];
export const jsExtensionsResolver = [...jsExtensions, '.json'];
export const jsExtensionsWithReact = [...jsExtensions, '.jsx'];
export const jsExtensionsWithAll = [...jsExtensionsWithReact];
// ::ts
export const tsExtensions = ['.ts', '.cts', '.mts'];
export const tsExtensionsResolver = [...tsExtensions, '.d.ts'];
export const tsExtensionsWithReact = [...tsExtensions, '.tsx'];
export const tsExtensionsWithAll = [...tsExtensionsWithReact, '.d.ts'];

// ::all
export const allExtensions = [...jsExtensions, ...tsExtensions];
export const allExtensionsWithAll = [...jsExtensionsWithAll, ...tsExtensionsWithAll];

// ::filter
export const extensionsAssigner = (extensions: string[] = [], _options?) => {
  const ets = Array.from(new Set(extensions));
  return ets;
};
export const extensionsPatternAssigner = (extensions: string[] = [], options?) => {
  const ets = Array.from(new Set(extensions));
  if (options)
    return [`**/*.{${ets.map(m => m.slice(1))}}`];

  return ets.map(m => `**/*${m}`);
};
export const extensionsRuleAssigner = (extensions: string[] = [], _options?) => {
  const ets = Array.from(new Set(extensions));
  return Object
    .fromEntries(
      Object.values(ets)
        .map(m => [m.slice(1), 'never']),
    );
};
