/**
 * Generates a random UUID4 and returns its string representation
 * @returns {`${string}-${string}-${string}-${string}-${string}`}
 */
export function generateUUID4(addHyphens, addGuidBrackets) {
    let uuid4 = crypto.randomUUID();
    if(!addHyphens) {
        uuid4 = uuid4.replace(/-/g, "");
    }
    if(addGuidBrackets) {
        uuid4 = "{" + uuid4 + "}";
    }
    return uuid4;
}

// Tool-centric stuff
{
    /** @type {HTMLSelectElement} */
    const eOptionTypeSelect = document.querySelector("select#uuid-generator-option-type");

    /** @type {HTMLInputElement} */
    const eOptionCountInput = document.querySelector("input#uuid-generator-option-count");

    /** @type {HTMLInputElement} */
    const eOptionHyphenInput = document.querySelector("input#uuid-generator-option-hyphens");
    /** @type {HTMLInputElement} */
    const eOptionGuidBracketsInput = document.querySelector("input#uuid-generator-option-guid-brackets");

    /** @type {HTMLElement} */
    const eGenerateButton = document.querySelector("#uuid-generator-generate");
    /** @type {HTMLElement} */
    const eDownloadRawButton = document.querySelector("#uuid-generator-download-raw");
    /** @type {HTMLElement} */
    const eDownloadJsonButton = document.querySelector("#uuid-generator-download-json");
    /** @type {HTMLElement} */
    const eDownloadYamlButton = document.querySelector("#uuid-generator-download-yaml");

    /** @type {HTMLTextAreaElement} */
    const ePreviewTextArea = document.querySelector("textarea#uuid-generator-preview");

    let lastUUIDs = [];

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

    function changeDesiredCount(difference = 0) {
        if(difference !== 0) {
            eOptionCountInput.value = getDesiredCount() + difference;
        }
        eOptionCountInput.value = getDesiredCount();
    }


    function downloadStringAsFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    window.onload = function () {
        eGenerateButton.addEventListener("click", function() {
            ePreviewTextArea.value = "";

            let desiredCount = getDesiredCount();
            let uuidGenerator = generateUUID4;

            let addHyphens = eOptionHyphenInput.checked;
            let addGuidBrackets = eOptionGuidBracketsInput.checked;

            lastUUIDs = [];
            for(let i= 0; i < desiredCount; i++) {
                lastUUIDs.push(uuidGenerator(addHyphens, addGuidBrackets));
                ePreviewTextArea.value += uuidGenerator(addHyphens, addGuidBrackets) + "\n";
            }
            ePreviewTextArea.value = lastUUIDs.join("\n");
        });
        eOptionCountInput.addEventListener("change", function() {
            changeDesiredCount(0);
        });
        eOptionCountInput.addEventListener("mousewheel", function(e) {
            // Handling wheel scroll on count field.
            if(e.wheelDelta < 0) {
                changeDesiredCount(-1);
            } else {
                changeDesiredCount(1);
            }
        });

        eDownloadRawButton.addEventListener("click", function() {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile(lastUUIDs.join("\n"), "uuids.txt", "text/plain");
        });
        eDownloadJsonButton.addEventListener("click", function() {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile(JSON.stringify(lastUUIDs, null, 4), "uuids.json", "application/json");
        });
        eDownloadYamlButton.addEventListener("click", function() {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile("- \"" + lastUUIDs.join("\"\n- \"") + "\"", "uuids.yaml", "text/yaml");
        });
    }
}
