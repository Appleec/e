/**
 *
 * method:
 * - cjs: require.resolve(pkg)
 * - esm: import.meta.resolve(pkg, import.meta.url)
 * - lib: import { isPackageExists } from 'local-pkg'
 * - lib: import { resolve } from 'import-meta-resolve'
 *
 * https://github.com/wooorm/import-meta-resolve/blob/main/lib/resolve.js
 * https://github.com/antfu-collective/local-pkg/blob/main/src/index.ts
 */
import { resolve } from 'import-meta-resolve';

/**
 * Whether exit package in local
 * @param pkg
 * @param scope
 */
function hasPackage(pkg: string, scope?: string) {
  try {
    resolve(pkg, import.meta.url);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Whether exit package from `local-pkg`
 *
 * @param pkg
 * @param scope
 * @example
 * import { isPackageExists } from 'local-pkg';
 * isPackageExists(pkg_name, ...);
 * // => `true` or `false`
 */
// export function hasPackageFromLocal(pkg: string, scope?: string) {
//   return isPackageExists(pkg, { paths: scope ? [scope] : [] });
// }

/**
 * Whether exit package in CJS
 * @param pkg
 * @param scope
 */
// export function hasPackageForCjs(pkg: string, scope?: string) {
//   try {
//     require.resolve(pkg);
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

/**
 * Whether exit package in ESM
 * @param pkg
 * @param scope
 */
function hasPackageForEsm(pkg: string, scope?: string) {
  try {
    import.meta.resolve(pkg, import.meta.url);
    return true;
  } catch (err) {
    return false;
  }
}

export default hasPackageForEsm;
export { hasPackageForEsm as hasPackage };
