import { ENCODING, readFile, writeFile, getFileExtension } from './fs.js';
export { JSON as MIMES } from './mimes.js';
import { JSON as EXTS } from './exts.js';

export const SPACES = 2;

export function isJSONFile(path) {
	const ext = getFileExtension(path);
	return EXTS.includes(ext);
}

export async function readJSONFile(path, { encoding = ENCODING, signal } = {}) {
	const content = await readFile(path, { encoding, signal });
	return JSON.parse(content);
}

export async function writeJSONFile(path, data, {
	encoding = ENCODING,
	signal,
	replacer = null,
	spaces = SPACES,
} = {}) {
	const json = JSON.stringify(data, replacer, spaces);
	await writeFile(path, json, { encoding, signal });
}

export { ENCODING };
