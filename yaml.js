import { extname } from 'node:path';
import { YAML as EXTS } from '@shgysk8zer0/consts/exts.js';
import { load, dump } from 'js-yaml';
import { readFile, writeFile, ENCODING } from './fs.js';
import { LF } from './consts.js';

export const SPACES = 2;

export function isYAMLFile(path) {
	const ext = extname(path);
	return EXTS.includes(ext);
}

export async function readYAMLFile(path, { encoding = ENCODING, signal } = {}) {
	const content = await readFile(path, { encoding, signal });
	return load(content);
}

export async function writeYAMLFile(path, data, {
	encoding = ENCODING,
	signal,
	replacer,
	spaces = SPACES,
} = {}) {
	const yaml = '---' + LF + dump(data, { replacer, ident: spaces });
	await writeFile(path, yaml, { encoding, signal });
}

export { ENCODING };
