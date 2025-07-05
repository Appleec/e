/**
 * Package
 */
export interface EPackage {
  // @deprecated use username
  name?: string;
  version?: string;
  path?: string;
  private?: boolean;
  type?: string;
  bin?: string | { [commandName: string]: string };
  description?: string;
  directories?: {
    bin?: string
  };
  files?: string[];
  funding?: string;
  resolutions?: { [key: string]: string };
  dependencies?: Record<string, EDependencyOptions>;
  devDependencies?: Record<string, EDependencyOptions>;
  optionalDependencies?: Record<string, EDependencyOptions>;
  peerDependencies?: Record<string, EDependencyOptions>;
  peerDependenciesMeta?: EPeerDependenciesMeta;
  dependenciesMeta?: EDependenciesMeta;
  bundleDependencies?: string[] | boolean;
  bundledDependencies?: string[] | boolean;
  homepage?: string;
  repository?: string | { url: string };
  bugs?: string | {
    url?: string;
    email?: string;
  };
  config?: object;
  engines?: {
    node?: string;
    npm?: string;
    pnpm?: string;
  };
  cpu?: string[];
  os?: string[];
  libc?: string[];
  main?: string;
  module?: string;
  typings?: string;
  types?: string;
  publishConfig?: EPublishConfig;
  typesVersions?: ETypesVersions;
  readme?: string;
  keywords?: string[];
  author?: string;
  license?: string;
  exports?: Record<string, string>;
  imports?: Record<string, unknown>;
  scripts?: EScripts;
}

/**
 * PackageExtension
 */
export type EPackageExtension = Pick<EPackage, 'dependencies' | 'optionalDependencies' | 'peerDependencies' | 'peerDependenciesMeta'>;

/**
 * PackageSearchBody
 */
export type EPackageSearchBody = {
  name: string;
  scope: string;
  description: string;
  author: string | EPackageAuthor;
  version: string;
  keywords: string | string[] | undefined;
  date: string;
  links?: {
    npm: string; // only include placeholder for URL eg: {url}/{packageName}
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  publisher?: any;
  maintainers?: EPackageAuthor[];
};

/**
 * PackageAuthor
 *
 * @description Author or maintainer
 */
export type EPackageAuthor = {
  username: string;
  email: string;
};

/**
 * PackageSearchResultWeb
 */
export type EPackageSearchResultWeb = {
  name: string;
  version: string;
  description: string;
};

/**
 * PackageManagers
 */
export type EPackageManagers = 'pnpm' | 'yarn' | 'npm' | string;

// package.publishConfig
interface EPublishConfig extends Record<string, unknown> {
  access?: string;
  registry?: string;
  directory?: string;
  linkDirectory?: boolean;
  executableFiles?: string[];
}

// package.dependencies
interface EDependencyOptions {
  from: string
  version: string
  resolved: string
  path: string
}

// package.typesVersions
interface ETypesVersions {
  [version: string]: {
    [pattern: string]: string[]
  }
}

// package.scripts
type EScripts = {
  [name: string]: string;
}

// package.dependenciesMeta
interface EDependenciesMeta {
  [dependencyName: string]: {
    injected?: boolean
    node?: string
    patch?: string
  }
}

// package.dependenciesMeta
interface EPeerDependenciesMeta {
  [dependencyName: string]: {
    optional?: boolean
  }
}
