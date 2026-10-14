import assert from 'node:assert';
import { URL, fileURLToPath, pathToFileURL} from 'node:url';
import { builtinModules } from 'node:module';

function isRelativeSpecifier(specifier) {
  if (specifier[0] === '.') {
    if (specifier.length === 1 || specifier[1] === '/') return true
    if (
      specifier[1] === '.' &&
      (specifier.length === 2 || specifier[2] === '/')
    ) {
      return true
    }
  }

  return false
}
function shouldBeTreatedAsRelativeOrAbsolutePath(specifier) {
  if (specifier === '') return false;
  if (specifier[0] === '/') return true;
  return isRelativeSpecifier(specifier);
}
function checkIfDisallowedImport(specifier, parsed, parsedParentURL): any {
  if (parsedParentURL) {
    // Avoid accessing the `protocol` property due to the lazy getters.
    const parentProtocol = parsedParentURL.protocol

    if (parentProtocol === 'http:' || parentProtocol === 'https:') {
      if (shouldBeTreatedAsRelativeOrAbsolutePath(specifier)) {
        // Avoid accessing the `protocol` property due to the lazy getters.
        const parsedProtocol = parsed?.protocol

        // `data:` and `blob:` disallowed due to allowing file: access via
        // indirection
        if (
          parsedProtocol &&
          parsedProtocol !== 'https:' &&
          parsedProtocol !== 'http:'
        ) {
          throw new Error(`import of ${specifier} by ${parsedParentURL} is not supported: remote imports cannot import from a local location.`)
        }

        return { url: parsed?.href || '' };
      }

      if (builtinModules.includes(specifier)) {
        throw new Error(`import of ${specifier} by ${parsedParentURL} is not supported: remote imports cannot import from a local location.`)
      }
      throw new Error(`import of ${specifier} by ${parsedParentURL} is not supported: only relative and absolute specifiers are supported.`)
    }
  }
}

export function defaultResolve(specifier, context: any = {}) {
  const { parentURL } = context;

  let parsedParentURL;
  if (parentURL) {
    try {
      parsedParentURL = new URL(parentURL);
    } catch {
      // Ignore exception
    }
  }

  let parsed;
  let protocol;

  try {
    parsed = shouldBeTreatedAsRelativeOrAbsolutePath(specifier)
      ? new URL(specifier, parsedParentURL)
      : new URL(specifier);

    // Avoid accessing the `protocol` property due to the lazy getters.
    protocol = parsed.protocol;

    if (protocol === 'data:') {
      return { url: parsed.href, format: null };
    }
  } catch {
    // Ignore exception
  }

  // There are multiple deep branches that can either throw or return; instead
  // of duplicating that deeply nested logic for the possible returns, DRY and
  // check for a return. This seems the least gnarly.
  const maybeReturn = checkIfDisallowedImport(
    specifier,
    parsed,
    parsedParentURL
  )

  if (maybeReturn) return maybeReturn

  // This must come after checkIfDisallowedImport
  if (protocol === undefined && parsed) {
    protocol = parsed.protocol
  }

  if (protocol === 'node:') {
    return {url: specifier}
  }

  // This must come after checkIfDisallowedImport
  if (parsed && parsed.protocol === 'node:') return {url: specifier}

  const conditions = getConditionsSet(context.conditions)

  const url = moduleResolve(specifier, new URL(parentURL), conditions, false)

  return {
    // Do NOT cast `url` to a string: that will work even when there are real
    // problems, silencing them
    url: url.href,
    format: defaultGetFormatWithoutErrors(url, {parentURL})
  }
}

export function resolve(specifier, parent) {
  if (!parent) {
    throw new Error(
      'Please pass `parent`: cannot ponyfill that'
    );
  }

  try {
    return defaultResolve(specifier, { parentURL: parent }).url;
  } catch (error) {
    // See: <https://github.com/nodejs/node/blob/45f5c9b/lib/internal/modules/esm/initialize_import_meta.js#L34>
    const exception = (error);

    if (
      (exception.code === 'ERR_UNSUPPORTED_DIR_IMPORT' ||
        exception.code === 'ERR_MODULE_NOT_FOUND') &&
      typeof exception.url === 'string'
    ) {
      return exception.url;
    }

    throw error;
  }
}
