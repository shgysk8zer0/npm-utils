import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, isAbsolute as isAbs } from 'node:path';
import { URL_PREFIXES, ROOT } from './consts.js';
import { validateURL } from './url.js';

export function isAbsolute(path) {
	if (path instanceof URL) {
		return true;
	} else if (typeof path !== 'string') {
		return false;
	} else if (path.startsWith('file:') && validateURL(path)) {
		const url = new URL(path);
		return isAbs(url.pathname) && path.endsWith(url.pathname);
	} else if (URL_PREFIXES.some(protocol => path.startsWith(protocol))) {
		const url = new URL(path);
		console.log({ url: url.href, path });
		return url.href === path && isAbsolute(url.pathname);
	} else {
		return isAbs(path);
	}
}

export const isRelative = path => ! isAbsolute(path);

export function getFileURL(path, base = ROOT.pathname) {
	if (path instanceof URL && path.protocol === 'file:') {
		return path;
	} else if (base instanceof URL) {
		return base.protocol === 'file:'
			? getFileURL(path, base.pathname)
			: getFileURL(path, base.href);
	} else if (typeof path !== 'string') {
		throw new TypeError('path must be a file: URL or string.');
	} else if (path.startsWith('file:')) {
		return new URL(path);
	} else if (URL_PREFIXES.some(protocol => path.startsWith(protocol)))  {
		return path;
	} else {
		const resolved = resolve(base.startsWith('file:') ? fileURLToPath(base) : base, path);
		return pathToFileURL(resolved);
	}
}

export function resolvePath(url) {
	if (url instanceof URL && url.protocol === 'file:') {
		return fileURLToPath(url);
	} else if (typeof url !== 'string') {
		throw new TypeError('url must be a file: URL or string.');
	} else if (url.startsWith('file:')) {
		return fileURLToPath(url);
	} else if (URL_PREFIXES.some(protocol => url.startsWith(protocol))) {
		return url;
	} else {
		return resolve(url);
	}
}

export function getRelativePath(path, base = ROOT.pathname) {
	if (path instanceof URL)  {
		return getRelativePath(path.protocol === 'file:' ? fileURLToPath(path) : path.href, base);
	} else if (base instanceof URL) {
		return getRelativePath(path, base.protocol === 'file:' ? fileURLToPath(base) : base.href);
	} else if (typeof path !== 'string' || typeof base !=='string') {
		throw new TypeError('Path and base must be a strings or URLs.');
	} else if (path.startsWith(base)) {
		return resolvePath(path).replace(base, './');
	} else {
		return path;
	}
}
