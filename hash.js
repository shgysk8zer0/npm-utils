import { createHash } from 'node:crypto';

const sris = new Map();
const ENCODING = 'utf8';
/**
 * A list of hash algorithms as constants
 */
export const MD5 = 'md5';
export const SHA1 = 'sha1';
export const SHA224 = 'sha224';
export const SHA256 = 'sha256';
export const SHA384 = 'sha384';
export const SHA512 = 'sha512';
export const SHA3_224 = 'sha3-224';
export const SHA3_256 = 'sha3-256';
export const SHA3_384 = 'sha3-384';
export const SHA3_512 = 'sha3-512';
export const SRI_ALGO = SHA384;
export const DEFAULT_ALGO = SHA384;

/**
 * Output encoding constants
 */
export const BASE64 = 'base64';
export const HEX = 'hex';
export const BINARY = 'binary';

export async function hash(input, { algo = DEFAULT_ALGO, encoding = ENCODING, output = 'hex' } = {}) {
	const hash = createHash(algo);
	hash.update(input, encoding);
	return hash.digest(output);
}

export async function sha512(input, { encoding = ENCODING, output = HEX }  = {}) {
	return hash(input, { algo: SHA512, encoding, output });
}

export async function sha384(input, { encoding = ENCODING, output = HEX }  = {}) {
	return hash(input, { algo: SHA384, encoding, output });
}

export async function sha256(input, { encoding = ENCODING, output = HEX }  = {}) {
	return hash(input, { algo: SHA256, encoding, output });
}

export async function md5(input, { encoding = ENCODING, output = HEX }  = {}) {
	return hash(input, { algo: MD5, encoding, output });
}

export async function sri(input) {
	if (sris.has(input)) {
		return sris.get(input);
	} else {
		const sri = `${SRI_ALGO}-${await hash(input, { algo: SRI_ALGO, output: BASE64 })}`;
		sris.set(input, sri);
		return sri;
	}
}
