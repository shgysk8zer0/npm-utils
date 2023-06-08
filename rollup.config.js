import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { listDirByExt } from './esm/fs.js';
const modules = await listDirByExt('./esm/', '.js');

export default {
	input: ['./index.js', ...modules],
	external: ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'js-yaml'],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		entryFileNames: '[name].cjs',
	},
};
