import { ROOT } from './consts.js';
import { isPath, isURL } from './utils.js';

export function pathToURL(path, base = ROOT) {
	if (path instanceof URL) {
		return path;
	} else if (isPath(base)) {
		// Absolute paths should be relative to project root/base
		return new URL(
			path.startsWith('/') ? `.${path}` : path,
			`file://${base.replace('file://', '')}`
		);
	} else if (isURL(base) || base instanceof URL) {
		return new URL(path, base);
	} else {
		throw new TypeError(`Cannot parse a URL with Path: ${path} and Base: ${base}`);
	}
}

export function validateURL(path, base) {
	try {
		new URL(path, base);
		return true;
	} catch {
		return false;
	}
}
