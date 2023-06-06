/**
 * Handles `<script type="importmap">`-type importmaps.
 * For the sake of browser compatibility, no `node:fs` or node-only
 * modules may be added to this script - It MUST be browser compatible.
 */
import { isObject, findLongestMatch, isBare } from './utils.js';
import { ROOT } from './consts.js';
import { pathToURL } from './url.js';

export const objectToMap = ({ imports = {} }) => new Map(Object.entries(imports));

export const validateImportmap = importmap => importmap instanceof Map
	&& [...importmap.values()].every(val => ! isBare(val));

export async function buildImportmap(importmap, mappings = []) {
	await Promise.all(mappings).then(maps => {
		maps.forEach(({ imports }) => {
			Object.entries(imports).forEach(([key, value]) => importmap.set(key, value));
		});
	});
}

export function createInvalidSpecifierError(key, value) {
	return TypeError(`Resolution of specifier “${key}” was blocked by a null entry. ${value} is a bare specifier and is not allowed.`);
}

export function getInvalidMapError(importmap) {
	if (! (importmap instanceof Map)) {
		throw new TypeError('`importmap` must be an instance of a Map.');
	}

	const errors = [...importmap.entries()]
		.filter(([, value]) => isBare(value))
		.map(([key, value]) => createInvalidSpecifierError(key, value));

	if (errors.length !== 0) {
		return new AggregateError(errors, 'Invalid importmap.');
	}
}

// @TODO Handle `scope`
export function resolveImport(specifier, importmap, {
	base = ROOT,
} = {}) {
	if (isObject(importmap)) {
		return resolveImport(specifier, objectToMap(importmap));
	} else if (importmap.has(specifier)) {
		const resolved = importmap.get(specifier);

		if (resolved instanceof URL) {
			return resolved;
		} else {
			const path = pathToURL(resolved, base);
			importmap.set(specifier, path);
			return path;
		}
	} else if (! isBare(specifier)) {
		return pathToURL(specifier, base);
	} else if (specifier.includes('/')) {
		const match = findLongestMatch(specifier, ...importmap.keys());

		if (typeof match === 'string') {
			const resolved = specifier.replace(match, importmap.get(match));
			const url = pathToURL(resolved, base);
			importmap.set(specifier, url);
			return url;
		}
	}
}
