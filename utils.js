export const URL_PREFIXES = ['https:', 'http:', 'blob:', 'data:'];
export const PATH_PREFIXES = ['file:', '/', './', '../'];

export const isString = str => typeof str === 'string';
export const isObject  = thing => typeof thing === 'object'
	&&  ! Object.is(thing, null)
	&& thing.constructor.name === 'Object';

export const isURL = str => isString(str) && URL_PREFIXES.some(pre  => str.startsWith(pre));
export const isPath = str => isString(str) && PATH_PREFIXES.some(pre  => str.startsWith(pre));
export const isBare = str => isString(str) && ! [...URL_PREFIXES,  ...PATH_PREFIXES].some(pre => str.startsWith(pre));

export function findLongestMatch(search, ...strs) {
	return strs.reduce((longest, value) => {
		if (! search.startsWith(value)) {
			return longest;
		} else if (typeof longest === 'string' && longest.length > value.length) {
			return longest;
		} else {
			return value;
		}
	}, null);
}
