export interface DependencyOptions {
    from: string
    version: string
    resolved: string
    path: string
}

export interface PeerDependenciesMeta {
    [dependencyName: string]: {
        optional?: boolean
    }
}

export interface DependenciesMeta {
    [dependencyName: string]: {
        injected?: boolean
        node?: string
        patch?: string
    }
}

export type PackageScripts = {
    [name: string]: string
}

export interface PublishConfig extends Record<string, unknown> {
    directory?: string
    linkDirectory?: boolean
    executableFiles?: string[]
    registry?: string
}

export interface TypesVersions {
    [version: string]: {
        [pattern: string]: string[]
    }
}

export interface PackageOptions {
    name?: string
    version?: string
    path?: string
    private?: boolean
    type?: string
    bin?: string | { [commandName: string]: string }
    description?: string
    directories?: {
        bin?: string
    }
    files?: string[]
    funding?: string
    dependencies?: Record<string, DependencyOptions>
    devDependencies?: Record<string, DependencyOptions>
    optionalDependencies?: Record<string, DependencyOptions>
    peerDependencies?: Record<string, DependencyOptions>
    peerDependenciesMeta?: PeerDependenciesMeta
    dependenciesMeta?: DependenciesMeta
    bundleDependencies?: string[] | boolean
    bundledDependencies?: string[] | boolean
    homepage?: string
    repository?: string | { url: string }
    bugs?: string | {
        url?: string
        email?: string
    }
    config?: object
    engines?: {
        node?: string
        npm?: string
        pnpm?: string
    }
    cpu?: string[]
    os?: string[]
    libc?: string[]
    main?: string
    module?: string
    typings?: string
    types?: string
    publishConfig?: PublishConfig
    typesVersions?: TypesVersions
    readme?: string
    keywords?: string[]
    author?: string
    license?: string
    exports?: Record<string, string>
    imports?: Record<string, unknown>
    scripts?: PackageScripts
}

export type PackageExtension = Pick<PackageOptions, 'dependencies' | 'optionalDependencies' | 'peerDependencies' | 'peerDependenciesMeta'>
