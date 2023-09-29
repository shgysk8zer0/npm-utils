import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { listDirByExt } from './fs.js';

const modules = await listDirByExt('.', '.js');

export default {
	input: modules.filter(script => ! script.endsWith('.config.js')),
	external: ['node:fs', 'node:fs/promises', 'node:crypto', 'node:path', 'js-yaml'],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		entryFileNames: '[name].cjs',
		chunkFileNames: '[name]-[hash].cjs',
	},
	plugins: [nodeResolve()],
};
