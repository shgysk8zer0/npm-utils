/* eslint-env node */
import { constants } from 'node:fs';
import { readFile as read,  writeFile as write, stat, realpath, readdir } from 'node:fs/promises';
import { resolve, extname, basename } from 'node:path';
import * as EXTS from '@shgysk8zer0/consts/exts.js';
import * as MIMES from '@shgysk8zer0/consts/mimes.js';
import { resolvePath } from './path.js';

export const ENCODING = 'utf8';

export async function ls(dir, { encoding = ENCODING, filter } = {}) {
	const items = await readdir(dir, { withFileTypes: true, encoding });
	const cwd = `${process.cwd()}/`;

	if (filter instanceof Function) {
		return items.filter(filter).map(({ name }) => resolve(cwd, dir, name).replace(cwd, './'));
	} else {
		return items.map(({ name }) => resolve(cwd, dir, name).replace(cwd, './'));
	}
}

export async function listDirByExt(dir, ext, { encoding = ENCODING, absolute = false } = {}) {
	const filter = item => item.isFile() && extname(item.name) === ext;
	const files = await ls(dir, { filter, encoding });

	if (absolute) {
		const cwd = `${process.cwd()}/`;
		return  files.filter(file => file.isFile() && extname(file.name) === ext)
			.map(({ name }) => resolve(cwd, name));
	} else {
		return  files;
	}
}

export async function readFile(path, { encoding = ENCODING, signal } = {}) {
	if ('Blob' in globalThis && path instanceof Blob) {
		return await path.text();
	} else {
		return read(resolvePath(path), { encoding,  signal });
	}
}

export async function writeFile(path, data, { encoding = ENCODING, signal } = {}) {
	if ('Blob' in globalThis && data instanceof Blob) {
		await saveFile(resolvePath(path), data, { encoding, signal });
	} else if (path instanceof URL && path) {
		await write(resolvePath(path), data, { encoding, signal });
	}
}

export async function fileExists(path) {
	return await stat(resolvePath(path)).then(s => s.isFile(), () => false);
}

export async function directoryExists(path) {
	return await stat(resolvePath(path)).then(s => s.isDirectory(), () => false);
}

export async function realPath(path) {
	return await realpath(path);
}

export function getFileExtension(path) {
	return extname(path);
}

export function replaceExtension(path, ext) {
	if (! ext.startsWith('.')) {
		throw new TypeError(`${ext} must begin with a ".".`);
	} else {
		const currExt = getFileExtension(path);
		return path.replace(currExt, ext);
	}
}

export function getMimeType(path) {
	const ext = extname(path).toLowerCase();
	const [key] = Object.entries(EXTS).find(([,exts]) => exts.includes(ext)) ?? [];

	if (typeof key === 'string') {
		return MIMES[key] ?? '';
	} else {
		return '';
	}
}

export async function openFile(path) {
	const resolved = resolvePath(path);
	const [{ buffer }, { mtime = Date.now() }] = await Promise.all([read(resolved), stat(resolved)]);
	const name = basename(resolved);
	const type = getMimeType(name);

	return new File([buffer], name, { type, lastModified: mtime.getTime() });
}

export async function saveFile(path, file, { encoding = ENCODING, signal } = {}) {
	await write(resolvePath(path), Buffer.from(await file.arrayBuffer()), { encoding, signal });
}

export { constants };
