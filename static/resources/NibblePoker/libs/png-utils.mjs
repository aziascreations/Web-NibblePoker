
import {stepCrc32IEEE, finishCrc32IEEE} from "./crc32.mjs";
import {areUintArraysEqual, peekUInt32BE, AsciiStringToUint8Array, Int32ToUint8Array, Uint8ArrayToHex} from "./data-utils.mjs"
import {loadFileAsUint8Array} from "./file-utils.mjs";

/**
 * Parent class extended by all PNG-related errors.
 */
export class PngError extends Error {}

export class PngInvalidFileHeaderError extends PngError {}

export class PngInvalidStructureError extends PngError {}

export class PngInvalidChunkNameError extends PngError {}

export class PngInvalidChunkChecksumError extends PngError {}

export class PngInvalidImageHeaderError extends PngError {}

export class PngMissingCriticalChunksError extends PngError {}

export const PngFileHeader = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

export class PngChunk {
    /** @type {string} */
    type;

    /** @type {Uint8Array} */
    data;

    /**
     * @param type {string}
     * @param data {Uint8Array}
     * @param expectedChecksum {Uint8Array|null}
     * @throws PngInvalidChunkNameError If the given chunk name isn't a valid chunk name.
     */
    constructor(type, data, expectedChecksum) {
        this.type = type;
        this.data = data;

        if(expectedChecksum !== null) {
            if(!areUintArraysEqual(expectedChecksum, this.getChecksumUint8Array())) {
                throw new PngInvalidChunkChecksumError(
                    `Invalid checksum was given ! (Expected ${
                        Uint8ArrayToHex(expectedChecksum)}, got ${
                        Uint8ArrayToHex(this.getChecksumUint8Array())})`
                );
            }
        }
    }

    getChecksumNumber() {
        return finishCrc32IEEE(
            stepCrc32IEEE(
                this.data,
                stepCrc32IEEE(AsciiStringToUint8Array(this.type))
            )
        )
    }

    getChecksumUint8Array() {
        return Int32ToUint8Array(this.getChecksumNumber());
    }
}

class PngImageHeaderChunk extends PngChunk {
    /**
     * @param type {string}
     * @param data {Uint8Array}
     * @param expectedChecksum {Uint8Array|null}
     * @throws PngInvalidChunkNameError If the given chunk name isn't a valid chunk name.
     * @throws PngInvalidImageHeaderError If the given chunk's size isn't exactly 13 bytes.
     */
    constructor(type, data, expectedChecksum) {
        super(type, data, expectedChecksum);

        if(this.data.length !== 13) {
            throw new PngInvalidImageHeaderError(`Invalid IHDR chunk size, got ${this.data.length} instead of 13 !`);
        }
    }

    getWidth() {
        return peekUInt32BE(this.data, 0);
    }

    getHeight() {
        return peekUInt32BE(this.data, 4);
    }

    getBitDepth() {
        return this.data[8];
    }

    getColorType() {
        return this.data[9];
    }

    getCompressionMethod() {
        return this.data[10];
    }

    getFilterMethod() {
        return this.data[11];
    }

    getInterlaceMethod() {
        return this.data[12];
    }

    /**
     * Converts a `PngChunk` to a `PngImageHeaderChunk`.
     * @param pngChunk {PngChunk}
     * @return {PngImageHeaderChunk}
     */
    static fromPngChunk(pngChunk) {
        return new PngImageHeaderChunk(pngChunk.type, pngChunk.data, null);
    }
}

export class PngFile {
    /** @type {File|null} */
    originalFile;

    /**
     * Optional trailing data located after the 'IEND' chunk.
     * @type {Uint8Array|null}
     */
    trailingData;

    /** @type {PngChunk[]} */
    chunks;

    /**
     * @param file {File|null}
     * @param fileData {Uint8Array|null}
     * @throws PngInvalidFileHeaderError If `fileData` is provided and doesn't contain a valid PNG file header.
     * @throws PngMissingCriticalChunksError If `fileData` is provided and is missing some critical chunks.
     */
    constructor(file = null, fileData = null) {
        this.originalFile = file;

        this.chunks = [];

        // Parsing and validating the data if given
        if(fileData !== null) {
            this.#validateFileHeader(fileData);
            this.#parseChunks(fileData);

            if(!this.hasEndChunk() || this.getChunkByType("IHDR") === null) {
                throw new PngMissingCriticalChunksError("One or more critical chunk is missing from the PNG file !");
            }
        }
    }

    /**
     * @param originalFileData {Uint8Array}
     */
    #validateFileHeader = (originalFileData) => {
        if(originalFileData.length < 8) {
            throw new PngInvalidFileHeaderError(
                `The file header's length is smaller than the required 8 ! (Got: ${originalFileData.length})`);
        }

        if(!areUintArraysEqual(originalFileData.slice(0, 8), PngFileHeader)) {
            throw new PngInvalidFileHeaderError(
                "The file header didn't have the expected data !\n" +
                `Expected: ${PngFileHeader}\\n` +
                `Got: ${originalFileData.slice(0, 8)}`
            );
        }
    }

    /**
     * @param originalFileData {Uint8Array}
     * @throws TypeError If a chunk's type couldn't be parsed.
     */
    #parseChunks = (originalFileData) => {
        let currentOffset = PngFileHeader.length;

        while(currentOffset < originalFileData.length) {
            // Checking if we haven't encountered an IEND, and we encountered a truncated file or trash data.
            if(currentOffset + 12 > originalFileData.length) {
                throw new PngInvalidStructureError("Unable to parse more chunks and no 'IEND' was encountered !");
            }

            const chunkLength = peekUInt32BE(originalFileData.slice(currentOffset, currentOffset + 4));
            const chunkType = new TextDecoder().decode(originalFileData.slice(currentOffset + 4, currentOffset + 8));

            // Checking if we have enough data left to read for the chunk's data.
            if(currentOffset + 12 + chunkLength > originalFileData.length) {
                throw new PngInvalidStructureError("Not enough data left to read the chunk !")
            }

            let chunkChecksum = originalFileData.slice(
                currentOffset + 8 + chunkLength, currentOffset + 8 + chunkLength + 4);

            this.chunks.push(
                new PngChunk(
                    chunkType,
                    (chunkLength === 0) ?
                        new Uint8Array(0) :
                        originalFileData.slice(currentOffset + 8, currentOffset + 8 + chunkLength),
                    chunkChecksum,
                    //originalFileData.slice(currentOffset + 4, currentOffset + 8)
                )
            );

            if(chunkType === "IEND") {
                break;
            }

            currentOffset += 12 + chunkLength;
        }

        // Handling trailing data
        if(currentOffset !== originalFileData.length) {
            this.trailingData = originalFileData.slice(currentOffset, originalFileData.length);
        }
    }

    /**
     * Attempts to retrieve a chunk via its type.
     * @param chunkName {string} The desired chunk's type.
     * @return {PngChunk|null}
     */
    getChunkByType(chunkName) {
        for(let iChunk in this.chunks) {
            if(this.chunks[iChunk].type === chunkName) {
                return this.chunks[iChunk];
            }
        }
        return null;
    }

    hasEndChunk() {
        return this.getChunkByType("IEND") !== null;
    }

    /**
     * @return {PngImageHeaderChunk|null}
     */
    getImageHeaderChunk() {
        let desiredChunk = this.getChunkByType("IHDR");
        if(desiredChunk !== null) {
            desiredChunk = PngImageHeaderChunk.fromPngChunk(desiredChunk);
        }
        return desiredChunk;
    }
}

/**
 * Reads and parses a given PNG file.
 * @param {File} file - The PNG file to process.
 * @returns {Promise<PngFile>} A promise that resolves with parsed PNG file.
 */
export function parsePngFile(file) {
    return loadFileAsUint8Array(file).then(byteBuffer => {
        return new PngFile(file, byteBuffer);
    });
}
