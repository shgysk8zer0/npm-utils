/* eslint-env node */
import { pathToFileURL } from 'node:url';

export const LF = '\n';
export const CRLF = '\r\n';
export const TAB = '\t';
export const WEB_PREFIXES = ['https:', 'http:', 'blob:', 'data:', 'ws:', 'javascript:'];
export const URL_PREFIXES = WEB_PREFIXES;
export const OTHER_PPEFIXES = ['tel:', 'mailto:', 'geo:', 'magnet:'];
export const FTP_PREFIXES = ['git:', 'ssh:', 'ftp:', 'ftps:', 'sftp:', 'dav:', 'davs:'];
export const PATH_PREFIXES = ['file:', '/', './', '../'];
export const ROOT = 'process' in globalThis && process.cwd instanceof Function
	? pathToFileURL(`${process.cwd()}/`)
	: 'document' in globalThis ? new URL(globalThis.document.baseURI) : null;
