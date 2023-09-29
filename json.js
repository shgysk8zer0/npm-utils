import { extname } from 'node:path';
import { JSON as EXTS } from '@shgysk8zer0/consts/exts.js';
import { ENCODING, readFile, writeFile } from './fs.js';

export const SPACES = 2;

export function isJSONFile(path) {
	const ext = extname(path);
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
