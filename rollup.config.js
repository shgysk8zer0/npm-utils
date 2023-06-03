export default {
	input: 'index.js',
	external: ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'js-yaml'],
	onwarn: warning => {
		if (warning.code === 'MISSING_GLOBAL_NAME' || warning.code === 'UNRESOLVED_IMPORT') {
			throw new Error(warning.message);
		} else if (warning.code !== 'CIRCULAR_DEPENDENCY') {
			console.warn(`(!) ${warning.message}`);
		}
	},
	output: {
		file: 'index.cjs',
		format: 'cjs',
	},
};
