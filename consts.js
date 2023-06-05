/* eslint-env node */
export const LF = '\n';
export const CRLF = '\r\n';
export const TAB = '\t';
export const ROOT = 'process' in globalThis && process.cwd instanceof Function
	? new URL(`${process.cwd()}/`, 'file:')
	: 'document' in globalThis ? new URL(document.baseURI) : null;
