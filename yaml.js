import { load, dump } from 'js-yaml';
import { readFile, writeFile, ENCODING } from './fs.js';

const SPACES = 2;
export const YAML_EXTS = ['.yaml', '.yml'];

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
	const yaml = dump(data, { replacer, ident: spaces });
	await writeFile(path, yaml, { encoding, signal });
}
