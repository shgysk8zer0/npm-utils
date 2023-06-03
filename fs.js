import { constants } from 'node:fs';
import { readFile as rf,  writeFile as wf, stat, realpath } from 'node:fs/promises';
import { extname } from 'node:path';

export const ENCODING = 'utf8';

export async function readFile(path, { encoding = ENCODING, signal } = {}) {
	return rf(path, { encoding, signal });
}

export async function writeFile(path, data, { encoding = ENCODING, signal } = {}) {
	await wf(path, data,{ encoding, signal });
}

export async function fileExists(path) {
	return await stat(path).then(s => s.isFile(), () => false);
}

export async function directoryExists(path) {
	return await stat(path).then(s => s.isDirectory(), () => false);
}

export async function realPath(path) {
	return await realpath(path);
}

export function getFileExtension(path) {
	return extname(path);
}

export { constants };
