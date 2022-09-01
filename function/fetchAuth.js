import { BASE_BACKEND, NOCORS } from './constants';

export async function fetchAuth(token, url, location = 'no') {
	if (token === 0 || token === null || location === '') {
		return null;
	}
	// if (!urlToken || urlToken.split("&Token=").length !== 2){
	//     return null
	// }
	// const token = urlToken.split("&Token=")[1]
	// if (token == 0){
	//     return null
	// }
	// const qq = urlToken.split("&Token=")[0]
	const req = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	};
	// return async (url) => {
	try {
		const res = await fetch(BASE_BACKEND + url, req);
		if (res.status !== 200) {
			throw Error('Server error' + (await res.json()));
		}
		return res.json();
	} catch (e) {
		console.log('Error:', e);
		return null;
	}
	// }
}

export function fetchAuthNoCors(token) {
	const req = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Origin: 'http://localhost:3000',
			host: '*',
			mode: 'no-cors',
			accept: '*',
			authorization: token,
		},
	};
	return async (url) => {
		const path = url.split('?')[0];
		const Query = url.split('?')[1];
		const res = await fetch(NOCORS + '?path=' + path + '&' + Query, req);
		return res.json();
	};
}
