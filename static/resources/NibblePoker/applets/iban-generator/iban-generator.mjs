// NibblePoker - IBAN Generator
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

import {
    IbanSpecification,
    countriesSpecs,
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
    /** @type {HTMLInputElement} */
    const eOptionPreferNumbers = document.querySelector("input#iban-generator-option-prefer-numbers");

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

    function onExclusionRulesChanged() {
        let showSepa = eOptionEnableSepa.checked;
        let showNonSepa = eOptionEnableNonSepa.checked;

        eOptionCountry.querySelectorAll("option").forEach(eOption => {
            /** @type {IbanSpecification} */
            let countrySpec = countriesSpecs[eOption.value];

            if(countrySpec.isSepa) {
                eOption.disabled = !showSepa;
            } else {
                eOption.disabled = !showNonSepa;
            }
        });

        if (eOptionCountry.options[eOptionCountry.selectedIndex]?.disabled) {
            const eFirstEnabled = Array.from(eOptionCountry.options)
                .find(option => !option.disabled);
            if (eFirstEnabled) {
                eFirstEnabled.selected = true;
            }
        }
    }

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
        // Exclusion rules
        eOptionEnableSepa.addEventListener("change", function() {
            if(!eOptionEnableSepa.checked && !eOptionEnableNonSepa.checked) {
                eOptionEnableNonSepa.checked = true;
            }
            onExclusionRulesChanged();
        });
        eOptionEnableNonSepa.addEventListener("change", function() {
            if(!eOptionEnableSepa.checked && !eOptionEnableNonSepa.checked) {
                eOptionEnableSepa.checked = true;
            }
            onExclusionRulesChanged();
        });

        // Generation
        eGenerateButton.addEventListener("click", function() {
            ePreviewTextArea.value = "";
            lastIBANs = [];

            let desiredCount = getDesiredCount();

            let preferNumbers = eOptionPreferNumbers.checked;
            let prettyIban = eOptionPrettyPrint.checked;

            /** @type {IbanSpecification[]} */
            let targetSpecs;
            if(eOptionForEach.checked) {
                targetSpecs = Object.values(countriesSpecs);
            } else {
                targetSpecs = [countriesSpecs[eOptionCountry.value]];
            }

            targetSpecs.forEach(spec => {
                for(let i = 0; i < desiredCount; i++) {
                    if(prettyIban) {
                        lastIBANs.push(
                            spec.getFormattedIban(
                                new StandardIban(spec.countryCode, spec.generateRandomBban(preferNumbers), spec).toString()
                            )
                        );
                    } else {
                        lastIBANs.push(
                            new StandardIban(spec.countryCode, spec.generateRandomBban(preferNumbers), spec).toString()
                        );
                    }
                }
            });

            ePreviewTextArea.value = lastIBANs.join("\n");
        });

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
            downloadStringAsFile(lastIBANs.join("\n"), "ibans.txt", "text/plain");
        });
        eDownloadJsonButton.addEventListener("click", function() {
            if (lastIBANs.length <= 0) {
                return;
            }
            downloadStringAsFile(JSON.stringify(lastIBANs, null, 4), "ibans.json", "application/json");
        });
        eDownloadYamlButton.addEventListener("click", function() {
            if (lastIBANs.length <= 0) {
                return;
            }
            downloadStringAsFile("- \"" + lastIBANs.join("\"\n- \"") + "\"", "ibans.yaml", "text/yaml");
        });
    };
}
