/* eslint-env node */
import { createHash } from 'node:crypto';

export const between = (val, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}) => {
	if (typeof val === 'string') {
		return between(parseFloat(val), { min, max });
	} else if (typeof val !== 'number' || Number.isNaN(val)) {
		return false;
	} else if (val < min || val > max) {
		return false;
	} else {
		return true;
	}
};

export const isDate = (str) => {
	try {
		return ! Number.isNaN(new Date(str).getTime());
	} catch(e) {
		return false;
	}
};

/* By default, false on empty strings */
export const isString = (str, { minLength = 1, maxLength } = {}) => {
	if (typeof str !== 'string') {
		return false;
	} else {
		return between(str.length, { min: minLength, max: maxLength });
	}
};

export const isEmail = (str) => isString(str, { minLength: 8 }) && str.includes('@')
	&& isUrl(`mailto:${str}`) && ! ['/',  '?', '#'].some(char => str.includes(char));

export const isUrl = (str, { requireSecure = false, requirePath = false } = {}) => {
	try {
		const url = new URL(str);
		return url.href.length !== 0
			&& (requireSecure === false || url.protocol === 'https:')
			&& (requirePath === false || url.pathname.length > 1);
	} catch {
		return false;
	}
};

export const isTel = (str) => isString(str.replaceAll(/\D/g, ''), { minLength: 10 });

export const validateMessageHeaders = ({ headers: {
	'x-message-id': uuid,
	'x-message-time': date,
	'x-message-origin': origin,
	'x-message-sig': signature,
	'x-message-algo': algo = 'sha256',
}} = {}) => {
	if (! isString(signature)) {
		return false;
	} else if (! isDate(date)) {
		return false;
	} else if (! isString(uuid, { minLength: 36, maxLength: 36 })) {
		return false;
	} else if (! isString(origin)) {
		return false;
	} else if (! isString(algo)) {
		return false;
	} else if (Math.abs(new Date(date) - new Date()) > 86400000) {
		// Message is withing a 1 day window of now
		return false;
	} else {
		try {
			const hash = createHash(algo.toLowerCase())
				.update(JSON.stringify({ uuid, date, origin })).digest('hex');
			return hash === signature;
		} catch(e) {
			return false;
		}
	}
};

export const formatPhoneNumber = (val) => {
	const nums = val.replaceAll(/\D/g, '');

	if (nums.length === 10) {
		return `+1-${nums.substr(0, 3)}-${nums.substr(3, 3)}-${nums.substr(6)}`;
	} else if (nums.length === 11) {
		return `+${nums.substr(0, 1)}-${nums.substr(1, 3)}-${nums.substr(4, 3)}-${nums.substr(7)}`;
	} else {
		return `+${nums}`;
	}
};
