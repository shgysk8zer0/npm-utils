/* eslint-env node */

export const LF = '\n';
export const CRLF = '\r\n';
export const TAB = '\t';
export const URL_PREFIXES = ['https:', 'http:', 'blob:', 'data:'];
export const PATH_PREFIXES = ['file:', '/', './', '../'];
export const ROOT = 'process' in globalThis && process.cwd instanceof Function
	? await import('node:url').then(({ pathToFileURL} ) => pathToFileURL(`${process.cwd()}/`))
	: 'document' in globalThis ? new URL(document.baseURI) : null;

console.log(ROOT.href);
