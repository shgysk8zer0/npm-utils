import { ENCODING, readFile, writeFile } from './fs.js';

const SPACES = 2;
export const JSON_EXTS = ['.json'];

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
