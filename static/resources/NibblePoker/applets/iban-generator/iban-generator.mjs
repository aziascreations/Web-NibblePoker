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

    // 'templates/applets/iban-generator.jinja' prefixes every element ID it renders with the
    // applet instance's UID (see 'templates/elements/applet.jinja'), so IDs must be resolved
    // from the applet's own container at runtime instead of being hardcoded here.
    /** @type {HTMLElement} */
    const eAppletContainer = document.querySelector('.np-applet[data-np-applet-id="iban-generator"]');
    const idPrefix = eAppletContainer.dataset.npAppletUid + "-iban-generator-";

    /** @type {HTMLInputElement} */
    const eOptionEnableSepa = document.getElementById(idPrefix + "option-enable-sepa");
    /** @type {HTMLInputElement} */
    const eOptionEnableNonSepa = document.getElementById(idPrefix + "option-enable-non-sepa");
    /** @type {HTMLInputElement} */
    const eOptionForEach = document.getElementById(idPrefix + "option-foreach");

    /** @type {HTMLSelectElement} */
    const eOptionCountry = document.getElementById(idPrefix + "option-country");

    /** @type {HTMLInputElement} */
    const eOptionCount = document.getElementById(idPrefix + "option-count");

    ///** @type {HTMLInputElement} */
    //const eOptionPreferRandom = document.getElementById(idPrefix + "option-prefer-random");
    /** @type {HTMLInputElement} */
    const eOptionPreferNumbers = document.getElementById(idPrefix + "option-prefer-numbers");
    /** @type {HTMLInputElement} */
    const eOptionPreferLetters = document.getElementById(idPrefix + "option-prefer-letters");

    /** @type {HTMLInputElement} */
    const eOptionFormatNone = document.getElementById(idPrefix + "option-format-none");
    /** @type {HTMLInputElement} */
    const eOptionFormatStandard = document.getElementById(idPrefix + "option-format-standard");
    /** @type {HTMLInputElement} */
    const eOptionFormat4By4 = document.getElementById(idPrefix + "option-format-4by4");

    /** @type {HTMLElement} */
    const eGenerateButton = document.getElementById(idPrefix + "generate");
    /** @type {HTMLElement} */
    const eDownloadRawButton = document.getElementById(idPrefix + "download-raw");
    /** @type {HTMLElement} */
    const eDownloadJsonButton = document.getElementById(idPrefix + "download-json");
    /** @type {HTMLElement} */
    const eDownloadYamlButton = document.getElementById(idPrefix + "download-yaml");

    /** @type {HTMLTextAreaElement} */
    const ePreviewTextArea = document.getElementById(idPrefix + "preview");

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
        return getInputCount(eOptionCount, 1, 10000);
    }

    function changeDesiredCount(difference = 0) {
        if(difference !== 0) {
            eOptionCount.value = getDesiredCount(eOptionCount, 1, 10000) + difference;
        }
        eOptionCount.value = getDesiredCount(eOptionCount, 1, 10000);
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
            let preferLetters = eOptionPreferLetters.checked;

            let ibanFormat = (
                eOptionFormatNone.checked ? 0 : (
                    eOptionFormatStandard.checked ? 1 : (
                        eOptionFormat4By4.checked ? 2 : 0
                    )
                )
            );

            /** @type {IbanSpecification[]} */
            let targetSpecs;
            if(eOptionForEach.checked) {
                targetSpecs = Object.values(countriesSpecs);

                // BUGFIX: Removing unwanted specs.
                if(!eOptionEnableSepa.checked) {
                    targetSpecs = targetSpecs.filter(ibanSpec => !ibanSpec.isSepa);
                }
                if(!eOptionEnableNonSepa.checked) {
                    targetSpecs = targetSpecs.filter(ibanSpec => ibanSpec.isSepa);
                }
            } else {
                targetSpecs = [countriesSpecs[eOptionCountry.value]];
            }

            targetSpecs.forEach(spec => {
                if((spec.isSepa && !eOptionEnableSepa.checked) || (!spec.isSepa && !eOptionEnableNonSepa.checked)) {
                    return;
                }
                for(let i = 0; i < desiredCount; i++) {
                    if(ibanFormat === 1) {
                        // standard
                        lastIBANs.push(
                            spec.getFormattedIban(
                                new StandardIban(spec.countryCode, spec.generateRandomBban(preferNumbers, preferLetters), spec)
                                    .toString()
                            )
                        );
                    } else if(ibanFormat === 2) {
                        // 4-by-4
                        lastIBANs.push(
                            new StandardIban(spec.countryCode, spec.generateRandomBban(preferNumbers, preferLetters), spec)
                                .toString()
                                .match(/.{1,4}/g)
                                .join(' ')
                        );
                    } else {
                        // none
                        lastIBANs.push(
                            new StandardIban(spec.countryCode, spec.generateRandomBban(preferNumbers, preferLetters), spec)
                                .toString()
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
