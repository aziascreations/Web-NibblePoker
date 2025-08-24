import {loadFileAsUint8Array} from "./file-utils.mjs";
import {peekUInt32BE, peekUInt16BE} from "./data-utils.mjs";

/*export const test = {
    WINDOWS: "BM",
    OS2_STRUCT_BITMAP_ARRAY: "BA",
    OS2_STRUCT_COLOR_ICON: "CI",
    OS2_CONST_COLOR_POINTER: "CP",
    OS2_STRUCT_ICON: "IC",
    OS2_POINTER: "PT",
}*/

export class BmpHeader {
    /** @type {Uint8Array} */
    data;

    /**
     * @param byteArray {Uint8Array|null}
     */
    constructor(byteArray) {
        if(byteArray === null || byteArray === undefined) {
            this.data = new Uint8Array(14);
        } else {
            this.data = byteArray;
        }
    }

    getSignature() {
        return peekUInt16BE(this.data, 0);
    }

    getFileSize() {
        return peekUInt32BE(this.data, 2);
    }

    getReserved() {
        return peekUInt32BE(this.data, 6);
    }

    getDataOffset() {
        return peekUInt32BE(this.data, 10);
    }
}

export class CrudeBmpFile {

    constructor(file = null, fileData = null) {
        this.originalFile = file;
    }

}

export function parseBmpFile(file) {
    return loadFileAsUint8Array(file).then(byteBuffer => {
        return new CrudeBmpFile(file, byteBuffer);
    });
}
