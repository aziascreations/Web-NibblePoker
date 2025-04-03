
/**
 * Reads a file and returns its content as a string.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} A promise that resolves with the file content as a string.
 */
export function loadFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

/**
 * Reads a file and returns its content as a `Uint8Array`.
 * @param {File} file - The file to read.
 * @returns {Promise<Uint8Array>} A promise that resolves with the file content as a byte buffer.
 */
export function loadFileAsUint8Array(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
