/* eslint-disable import/prefer-default-export */
export const wait = (timeout: number) => {
	return new Promise(res => {
		setTimeout(res, timeout);
	});
};
