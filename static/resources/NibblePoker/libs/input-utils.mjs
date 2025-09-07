// NibblePoker - HTML Input Utils
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

function postProcessNumber(desiredCount, min = null, max = null) {
    if (desiredCount === null) {
        desiredCount = 1;
    }

    if (typeof min === 'number') {
        if (desiredCount < min) {
            desiredCount = min;
        }
    }
    if (typeof max === 'number') {
        if (desiredCount > max) {
            desiredCount = max;
        }
    }

    return desiredCount;
}

/**
 * Retrieves the integer number from an `HTMLInputElement`
 * @param eInput {HTMLInputElement|HTMLSelectElement} The `HTMLInputElement` from which the value will be retrieved.
 * @param min {number|null} If given, sets a minimum the value can have when returned.
 * @param max {number|null} If given, sets a maximum the value can have when returned.
 * @returns {number|NaN} The value from the given `HTMLInputElement`, or `1` if no valid one was given.
 */
export function getInputCount(eInput, min = null, max = null) {
    let desiredCount = null;
    try {
        desiredCount = parseInt(eInput.value);
    } catch (e) {
        console.error(e);
    }
    return postProcessNumber(desiredCount, min, max);
}

/**
 * Retrieves the float number from an `HTMLInputElement`
 * @param eInput {HTMLInputElement|HTMLSelectElement} The `HTMLInputElement` from which the value will be retrieved.
 * @param min {number|null} If given, sets a minimum the value can have when returned.
 * @param max {number|null} If given, sets a maximum the value can have when returned.
 * @returns {number|NaN} The value from the given `HTMLInputElement`, or `1` if no valid one was given.
 */
export function getInputNumber(eInput, min = null, max = null) {
    let desiredCount = null;
    try {
        desiredCount = parseFloat(eInput.value);
    } catch (e) {
        console.error(e);
    }
    return postProcessNumber(desiredCount, min, max);
}
