export const encodeToHex = (str: string) => {
	return str
		.split('')
		.map((char) => char.charCodeAt(0).toString(16))
		.join('');
};

export const decodeFromHex = (hex: string) => {
	return (
		hex
			.match(/.{1,2}/g)
			?.map((byte) => String.fromCharCode(parseInt(byte, 16)))
			.join('') || ''
	);
};
