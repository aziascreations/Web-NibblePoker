
/**
 * Compares two UintXArray and checks if their content is the same.
 * @param array1 {Uint8Array|Uint16Array|Uint32Array}
 * @param array2 {Uint8Array|Uint16Array|Uint32Array}
 * @return {boolean}
 */
export function areUintArraysEqual(array1, array2) {
    if ((typeof array1) !== (typeof array2)) {
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Peeks a UInt16 from the given data at the given offset in Big-Endian.
 * @param data {Uint8Array} - Data to read from.
 * @param offset {number} - Offset to read from in the given `data`.
 * @return {number} The peeked number.
 * @throws RangeError If the given offset is too close or over the end of the data.
 */
export function peekUInt16BE(data, offset = 0) {
    if(offset + 2 > data.length) {
        throw new RangeError(`Offset is too far into the given data ! (${offset} & ${data.length})`);
    }
    return new DataView(data.buffer, offset, 2).getUint16(0, false);
}

/**
 * Peeks a UInt16 from the given data at the given offset in Little-Endian.
 * @param data {Uint8Array} - Data to read from.
 * @param offset {number} - Offset to read from in the given `data`.
 * @return {number} The peeked number.
 * @throws RangeError If the given offset is too close or over the end of the data.
 */
export function peekUInt16LE(data, offset = 0) {
    if(offset + 2 > data.length) {
        throw new RangeError(`Offset is too far into the given data ! (${offset} & ${data.length})`);
    }
    return new DataView(data.buffer, offset, 2).getUint16(0, true);
}

/**
 * Peeks a UInt32 from the given data at the given offset in Big-Endian.
 * @param data {Uint8Array} - Data to read from.
 * @param offset {number} - Offset to read from in the given `data`.
 * @return {number} The peeked number.
 * @throws RangeError If the given offset is too close or over the end of the data.
 */
export function peekUInt32BE(data, offset = 0) {
    if(offset + 4 > data.length) {
        throw new RangeError(`Offset is too far into the given data ! (${offset} & ${data.length})`);
    }
    return new DataView(data.buffer, offset, 4).getUint32(0, false);
}

/**
 * Peeks a UInt32 from the given data at the given offset in Little-Endian.
 * @param data {Uint8Array} - Data to read from.
 * @param offset {number} - Offset to read from in the given `data`.
 * @return {number} The peeked number.
 * @throws RangeError If the given offset is too close or over the end of the data.
 */
export function peekUInt32LE(data, offset = 0) {
    if(offset + 4 > data.length) {
        throw new RangeError(`Offset is too far into the given data ! (${offset} & ${data.length})`);
    }
    return new DataView(data.buffer, offset, 4).getUint32(0, true);
}

/**
 * Converts a given `Uint8Array` to a hexadecimal representation.
 * @param data The data to be transformed into a string.
 * @return {string} The resulting hexadecimal string.
 */
export function Uint8ArrayToHex(data) {
    return Array.prototype.map.call(data, x => ('00' + x.toString(16)).slice(-2)).join('');
}

/*export function decimalToHexString(number) {
	if (number < 0) {
		number = 0xFFFFFFFF + number + 1;
	}
	return number.toString(16).toUpperCase();
}*/

export function AsciiStringToUint8Array(asciiText) {
    return Uint8Array.from(Array.from(asciiText).map(asciiLetter => asciiLetter.charCodeAt(0)));
}

export function Int32ToUint8Array(number) {
    /*let arr = new ArrayBuffer(4);
    new DataView(arr).setUint32(0, number);
    return new Uint8Array(arr);*/

    return new Uint8Array([
        (number >>> 24) & 0xFF,
        (number >>> 16) & 0xFF,
        (number >>> 8) & 0xFF,
        number & 0xFF
    ]);
}
