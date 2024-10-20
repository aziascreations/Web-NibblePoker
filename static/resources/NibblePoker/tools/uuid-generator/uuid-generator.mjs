/**
 * Generates a random UUID4 and returns its string representation
 * @returns {`${string}-${string}-${string}-${string}-${string}`}
 */
export function generateUUID4() {
    return crypto.randomUUID();
}

// Tool-centric stuff
{
    /** @type {HTMLSelectElement} */
    const eOptionTypeSelect = document.querySelector("select#uuid-generator-option-type");
    /** @type {HTMLInputElement} */
    const eOptionCountInput = document.querySelector("input#uuid-generator-option-count");
    /** @type {HTMLInputElement} */
    const eOptionHyphenInput = document.querySelector("input#uuid-generator-option-hyphens");

    /** @type {HTMLElement} */
    const eGenerateButton = document.querySelector("#uuid-generator-generate");
    /** @type {HTMLElement} */
    const eDownloadButton = document.querySelector("#uuid-generator-download");

    /** @type {HTMLTextAreaElement} */
    const ePreviewTextArea = document.querySelector("textarea#uuid-generator-preview");

    /** @returns {number} */
    function getDesiredCount() {
        let desiredCount = null;
        try {
            desiredCount = parseInt(eOptionCountInput.value);
        } catch (e) {
            console.error(e);
        }
        if(desiredCount === null) {
            desiredCount = 1;
        }
        if(desiredCount < 1) {
            desiredCount = 1;
        }
        if(desiredCount > 1000) {
            desiredCount = 1000;
        }
        return desiredCount;
    }

    window.onload = function () {
        eGenerateButton.addEventListener("click", function() {
            ePreviewTextArea.value = "";

            let desiredCount = getDesiredCount();
            let uuidGenerator = generateUUID4;

            for(let i= 0; i < desiredCount; i++) {
                ePreviewTextArea.value += uuidGenerator() + "\n";
            }
        });
        eDownloadButton.addEventListener("click", function() {
            //eFileDropInput.click();
        });
    }
}
