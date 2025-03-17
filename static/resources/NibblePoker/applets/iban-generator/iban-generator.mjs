// NibblePoker - IBAN Generator
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

import {
    parseStandardIban,
    IbanSpecification,
    countriesSpecs,
    getIbanChecksumFromParts,
    StandardIban
} from "../../libs/iban.mjs";

import {getInputCount} from "../../libs/input-utils.mjs"

import {downloadStringAsFile} from "../../libs/download-helper.mjs";

import {initCore} from "../../js/nibblepoker-core.mjs";

// Tool-centric stuff
{
    initCore();

    /** @type {HTMLInputElement} */
    const eOptionEnableSepa = document.querySelector("input#iban-generator-option-enable-sepa");
    /** @type {HTMLInputElement} */
    const eOptionEnableNonSepa = document.querySelector("input#iban-generator-option-enable-non-sepa");
    /** @type {HTMLInputElement} */
    const eOptionForEach = document.querySelector("input#iban-generator-option-foreach");

    /** @type {HTMLSelectElement} */
    const eOptionCountry = document.querySelector("select#iban-generator-option-country");

    /** @type {HTMLInputElement} */
    const eOptionCount = document.querySelector("input#iban-generator-option-count");
    /** @type {HTMLInputElement} */
    const eOptionPrettyPrint = document.querySelector("input#iban-generator-option-pretty");

    /** @type {HTMLElement} */
    const eGenerateButton = document.querySelector("#iban-generator-generate");
    /** @type {HTMLElement} */
    const eDownloadRawButton = document.querySelector("#iban-generator-download-raw");
    /** @type {HTMLElement} */
    const eDownloadJsonButton = document.querySelector("#iban-generator-download-json");
    /** @type {HTMLElement} */
    const eDownloadYamlButton = document.querySelector("#iban-generator-download-yaml");

    /** @type {HTMLTextAreaElement} */
    const ePreviewTextArea = document.querySelector("textarea#iban-generator-preview");

    let lastIBANs = [];

    /** @returns {number} */
    function getDesiredCount() {
        return getInputCount(eOptionCount, 1, 1000);
    }

    function changeDesiredCount(difference = 0) {
        if(difference !== 0) {
            eOptionCount.value = getDesiredCount(eOptionCount, 1, 1000) + difference;
        }
        eOptionCount.value = getDesiredCount(eOptionCount, 1, 1000);
    }

    window.onload = function () {

        // Count option
        eOptionCount.addEventListener("change", function() {
            changeDesiredCount(0);
        });
        eOptionCount.addEventListener("mousewheel", function(e) {
            // Handling wheel scroll on count field.
            if(e.wheelDelta < 0) {
                changeDesiredCount(-1);
            } else {
                changeDesiredCount(1);
            }
        });

        // Download buttons
        eDownloadRawButton.addEventListener("click", function() {
            if (lastIBANs.length <= 0) {
                return;
            }
            downloadStringAsFile(lastIBANs.join("\n"), "uuids.txt", "text/plain");
        });
        eDownloadJsonButton.addEventListener("click", function() {
            if (lastIBANs.length <= 0) {
                return;
            }
            downloadStringAsFile(JSON.stringify(lastIBANs, null, 4), "uuids.json", "application/json");
        });
        eDownloadYamlButton.addEventListener("click", function() {
            if (lastIBANs.length <= 0) {
                return;
            }
            downloadStringAsFile("- \"" + lastIBANs.join("\"\n- \"") + "\"", "uuids.yaml", "text/yaml");
        });
    };

    console.log(new StandardIban("LU", "0108783391941421", countriesSpecs.LU).toString());
    console.log(new StandardIban("LU", "123456ABCDEFGHIL", countriesSpecs.LU).toString());
}
