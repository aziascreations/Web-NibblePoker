
/**
 * @param data {Uint8Array}
 * @param crc32 {number}
 * @return {number}
 */
export function stepCrc32IEEE(data, crc32 = 0xffffffff) {
	for (let i = 0; i < data.length; i++) {
		crc32 ^= data[i];
		for (let j = 0; j < 8; j++) {
			crc32 = (crc32 >>> 1) ^ (crc32 & 1 ? 0xedb88320 : 0);
		}
	}
	return crc32;
}

/**
 * @param crc32 {number}
 * @return {number}
 */
export function finishCrc32IEEE(crc32) {
	return (crc32 ^ 0xffffffff) >>> 0;
}

/**
 * Calculates the CRC32-IEEE for the given data
 * @param data {Uint8Array}
 * @param crc32 {number}
 * @return {number} The resulting CRC32
 */
export function crc32IEEE(data, crc32 = 0xffffffff) {
	return finishCrc32IEEE(stepCrc32IEEE(data, crc32));
}
