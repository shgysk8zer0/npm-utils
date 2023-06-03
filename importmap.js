import { isObject, findLongestMatch, isBare } from './utils.js';

export const objectToMap = ({ imports = {} }) => new Map(Object.entries(imports));

export const validateImportmap = importmap => importmap instanceof Map
	&& [...importmap.values()].every(val => ! isBare(val));

export function resolveImport(specifier, importmap) {
	if (isObject(importmap)) {
		return resolveImport(specifier, objectToMap(importmap));
	} else if (importmap.has(specifier)) {
		return new URL(importmap.get(specifier), import.meta.url);
	} else if (specifier.includes('/')) {
		const match = findLongestMatch(specifier, ...importmap.keys());

		if (typeof match === 'string') {
			const resolved = specifier.replace(match, importmap.get(match));
			importmap.set(specifier, resolved);
			return new URL(resolved, import.meta.url);
		}
	}
}
