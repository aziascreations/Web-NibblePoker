import {getInputCount} from "../../libs/input-utils.mjs";

import {generateUUID4} from "../../libs/uuid.mjs";

import {downloadStringAsFile} from "../../libs/download-helper.mjs";
import {initCore} from "../../js/nibblepoker-core.mjs";

// Tool-centric stuff
{
    initCore();

    /** @type {HTMLSelectElement} */
    const eOptionTypeSelect = document.querySelector("select#uuid-generator-option-type");

    /** @type {HTMLInputElement} */
    const eOptionCountInput = document.querySelector("input#uuid-generator-option-count");

    /** @type {HTMLInputElement} */
    const eOptionHyphenInput = document.querySelector("input#uuid-generator-option-hyphens");
    /** @type {HTMLInputElement} */
    const eOptionGuidBracketsInput = document.querySelector("input#uuid-generator-option-guid-brackets");
    /** @type {HTMLInputElement} */
    const eOptionUppercaseInput = document.querySelector("input#uuid-generator-option-uppercase");

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
        return getInputCount(eOptionCountInput, 1, 1000);
    }

    function changeDesiredCount(difference = 0) {
        if (difference !== 0) {
            eOptionCountInput.value = getDesiredCount() + difference;
        }
        eOptionCountInput.value = getDesiredCount();
    }

    window.onload = function () {
        eGenerateButton.addEventListener("click", function () {
            ePreviewTextArea.value = "";

            let desiredCount = getDesiredCount();
            let uuidGenerator = generateUUID4;

            let addHyphens = eOptionHyphenInput.checked;
            let addGuidBrackets = eOptionGuidBracketsInput.checked;

            lastUUIDs = [];
            if (eOptionUppercaseInput.checked) {
                for (let i = 0; i < desiredCount; i++) {
                    lastUUIDs.push(uuidGenerator(addHyphens, addGuidBrackets).toUpperCase());
                }
            } else {
                for (let i = 0; i < desiredCount; i++) {
                    lastUUIDs.push(uuidGenerator(addHyphens, addGuidBrackets));
                }
            }

            ePreviewTextArea.value = lastUUIDs.join("\n");
        });

        // Count option
        eOptionCountInput.addEventListener("change", function () {
            changeDesiredCount(0);
        });
        eOptionCountInput.addEventListener("mousewheel", function (e) {
            // Handling wheel scroll on count field.
            if (e.wheelDelta < 0) {
                changeDesiredCount(-1);
            } else {
                changeDesiredCount(1);
            }
        });

        // Download buttons
        eDownloadRawButton.addEventListener("click", function () {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile(lastUUIDs.join("\n"), "uuids.txt", "text/plain");
        });
        eDownloadJsonButton.addEventListener("click", function () {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile(JSON.stringify(lastUUIDs, null, 4), "uuids.json", "application/json");
        });
        eDownloadYamlButton.addEventListener("click", function () {
            if (lastUUIDs.length <= 0) {
                return;
            }
            downloadStringAsFile("- \"" + lastUUIDs.join("\"\n- \"") + "\"", "uuids.yaml", "text/yaml");
        });
    }
}
