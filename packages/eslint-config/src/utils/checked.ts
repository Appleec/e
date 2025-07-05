/**
 * import { isPackageExists } from 'local-pkg';
 *
 * @see https://github.com/antfu-collective/local-pkg/blob/main/src/index.ts
 */
import { isPackageExists } from 'local-pkg';


export function hasPackage(pkg: string, scope?: string) {
  // try {
  //   import.meta.resolve(pkg, import.meta.url);
  //   return true;
  // } catch {
  //   return false;
  // }
  return isPackageExists(pkg, { paths: scope ? [scope] : [] });
}
