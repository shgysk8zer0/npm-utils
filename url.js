import { ROOT } from './consts.js';
import { isPath, isURL } from './utils.js';
import { getFileURL } from './path.js';

export function pathToURL(path, base = ROOT.pathname) {
	if (path instanceof URL) {
		return path;
	} else if (isURL(path)) {
		return new URL(path);
	} else if (isPath(path) && isPath(base)) {
		// Absolute paths should be relative to project root/base
		return getFileURL(path.startsWith('/') ? `.${path}` : path, base);
		/*return new URL(
			path.startsWith('/') ? `.${path}` : path,
			`file://${base.replace('file://', '')}`
		);*/
	} else if (isURL(base) || base instanceof URL) {
		return new URL(path, base);
	} else {
		throw new TypeError(`Cannot parse a URL with Path: ${path} and Base: ${base}`);
	}
}

export function validateURL(path, base) {
	if (path instanceof URL) {
		return true;
	} else if (URL.canParse instanceof Function) {
		return URL.canParse(path, base);
	} else {
		try {
			new URL(path, base);
			return true;
		} catch {
			return false;
		}
	}
}
