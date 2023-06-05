import { listDirByExt } from './esm/fs.js';
const modules = await listDirByExt('./esm/', '.js');

export default {
	input: ['./index.js', ...modules],
	external: ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'js-yaml'],
	onwarn: warning => {
		if (warning.code === 'MISSING_GLOBAL_NAME' || warning.code === 'UNRESOLVED_IMPORT') {
			throw new Error(warning.message);
		} else if (warning.code !== 'CIRCULAR_DEPENDENCY') {
			console.warn(`(!) ${warning.message}`);
		}
	},
	output: {
		dir: './cjs/',
		format: 'cjs',
		// preserveModules: true,
		entryFileNames: '[name].cjs',
	},
};
