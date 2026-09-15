import {initCore} from "../../js/nibblepoker-core.mjs";
//import {Decimal} from "../../../DecimalJs/10.6.0/decimal.mjs";
import {Decimal} from "../../../DecimalJs-Light/2.5.1/decimal.mjs";
import {getInputCount, getInputNumber} from "../../libs/input-utils.mjs";

// Tool-centric stuff
{
    initCore();

    const classesReadonly = ["bkgd-gray"];

    // 'templates/applets/vat-calculator.jinja' prefixes every element ID it renders with the
    // applet instance's UID (see 'templates/elements/applet.jinja'), so IDs must be resolved
    // from the applet's own container at runtime instead of being hardcoded here.
    /** @type {HTMLElement} */
    const eAppletContainer = document.querySelector('.np-applet[data-np-applet-id="vat-calculator"]');
    const idPrefix = eAppletContainer.dataset.npAppletUid + "-vat-calculator-";

    const calcRadioGroupName = idPrefix + "radio-group-target";

    /** @type {HTMLLabelElement} */
    const ePresetShortLabel = document.querySelector(`label[for="${idPrefix}preset-short"]`);
    /** @type {HTMLSelectElement} */
    const ePresetShortSelect = document.getElementById(idPrefix + "preset-short");

    /** @type {HTMLLabelElement} */
    const ePresetDetailedLabel = document.querySelector(`label[for="${idPrefix}preset-detailed"]`);
    /** @type {HTMLSelectElement} */
    const ePresetDetailedSelect = document.getElementById(idPrefix + "preset-detailed");

    /** @type {HTMLInputElement} */
    const eCheckboxDetailedPreset = document.getElementById(idPrefix + "detailed-presets");

    /** @type {HTMLSpanElement} */
    const ePresetEchoedCountry = document.getElementById(idPrefix + "preset-country-echo");

    /** @type {HTMLButtonElement} */
    const eButtonDecimalPlacesMinus = document.getElementById(idPrefix + "option-decimal-places-minus");
    /** @type {HTMLInputElement} */
    const eInputDecimalPlaces = document.getElementById(idPrefix + "option-decimal-places");
    /** @type {HTMLButtonElement} */
    const eButtonDecimalPlacesPlus = document.getElementById(idPrefix + "option-decimal-places-plus");

    /* #vat-calculator-detailed-trim-zeroes */

    /** @type {HTMLInputElement} */
    const eCalcRateRadio = document.getElementById(idPrefix + "radio-rate");
    /** @type {HTMLInputElement} */
    const eCalcRateInput = document.getElementById(idPrefix + "input-rate");

    /** @type {HTMLInputElement} */
    const eCalcUntaxedRadio = document.getElementById(idPrefix + "radio-untaxed");
    /** @type {HTMLInputElement} */
    const eCalcUntaxedInput = document.getElementById(idPrefix + "input-untaxed");

    /** @type {HTMLInputElement} */
    const eCalcTaxedRadio = document.getElementById(idPrefix + "radio-taxed");
    /** @type {HTMLInputElement} */
    const eCalcTaxedInput = document.getElementById(idPrefix + "input-taxed");

    /** @type {HTMLSelectElement} */
    const eRoundingModeSelect = document.getElementById(idPrefix + "rounding-mode");

    /**
     * Handles the switch between the short and detailed standard rates selects
     */
    function handlePresetDetailLevelChange() {
        ePresetShortLabel.hidden = eCheckboxDetailedPreset.checked;
        ePresetShortSelect.hidden = eCheckboxDetailedPreset.checked;
        ePresetDetailedLabel.hidden = !eCheckboxDetailedPreset.checked;
        ePresetDetailedSelect.hidden = !eCheckboxDetailedPreset.checked;
    }

    /** @returns {number} */
    function getDecimalPlaces() {
        return getInputCount(eInputDecimalPlaces, 0, 99);
    }

    function changeDecimalPlacesDesiredCount(difference = 0) {
        if (difference !== 0) {
            eInputDecimalPlaces.value = getInputCount(eInputDecimalPlaces, 0, 99) + difference;
        }
        eInputDecimalPlaces.value = getInputCount(eInputDecimalPlaces, 0, 99);
    }

    /**
     * Handles the locking and unlocking of the calculator input fields.
     * @param eInput {HTMLInputElement}
     * @param isLocked {boolean}
     */
    function setCalcFieldLockStatus(eInput, isLocked) {
        eInput.readOnly = isLocked;
        classesReadonly.forEach((roClass) => {
            eInput.classList.remove(roClass);
            if(isLocked) {
                eInput.classList.add(roClass);
            }
        });
    }

    function handleCalcValueChange() {
        let vatRate = getInputNumber(eCalcRateInput);
        let untaxedValue = getInputNumber(eCalcUntaxedInput);
        let taxedValue = getInputNumber(eCalcTaxedInput);

        if(eCalcRateRadio.checked) {
            if(untaxedValue === null || taxedValue === null || isNaN(untaxedValue) || isNaN(taxedValue)) {
                return;
            }
            untaxedValue = new Decimal(eCalcUntaxedInput.value);
            taxedValue = new Decimal(eCalcTaxedInput.value);

            eCalcRateInput.value = taxedValue
                .minus(untaxedValue)
                .div(untaxedValue)
                .times(100)
                .toDecimalPlaces(getDecimalPlaces());
        } else if(eCalcUntaxedRadio.checked) {
            if(vatRate === null || taxedValue === null || isNaN(vatRate) || isNaN(taxedValue)) {
                return;
            }
            vatRate = new Decimal(eCalcRateInput.value).dividedBy(100).plus(1);
            taxedValue = new Decimal(eCalcTaxedInput.value);

            eCalcUntaxedInput.value = taxedValue
                .dividedBy(vatRate)
                .toDecimalPlaces(getDecimalPlaces());
        } else if(eCalcTaxedRadio.checked) {
            if(vatRate === null || untaxedValue === null || isNaN(vatRate) || isNaN(untaxedValue)) {
                return;
            }
            vatRate = new Decimal(eCalcRateInput.value).dividedBy(100).plus(1);
            untaxedValue = new Decimal(eCalcUntaxedInput.value);

            eCalcTaxedInput.value = untaxedValue
                .times(vatRate)
                .toDecimalPlaces(getDecimalPlaces());
        }
    }

    function handleDecimalConfigChange() {
        Decimal.set({
            rounding: getInputCount(eRoundingModeSelect, 0, 8),
            precision: 99,
            defaults: true,
        });
    }

    function handlePresetChange() {
        if(ePresetShortSelect.value.length > 0) {
            let eSelectedOption = ePresetShortSelect.querySelector('option:checked');
            if(eSelectedOption === null) {
                return;
            }

            let eSelectedOptionGroup = eSelectedOption.closest('optgroup');
            if(eSelectedOptionGroup === null) {
                return;
            }

            ePresetEchoedCountry.innerHTML = eSelectedOptionGroup.label;
        } else {
            ePresetEchoedCountry.innerHTML = "";
        }
    }

    window.onload = function () {
        // Handling the detailed rate toggle
        eCheckboxDetailedPreset.addEventListener("click", function () {
            handlePresetDetailLevelChange();
        });

        // Handling the rate select input
        ePresetShortSelect.addEventListener("change", function () {
            ePresetDetailedSelect.selectedIndex = ePresetShortSelect.selectedIndex;
            eCalcRateInput.value = ePresetShortSelect.value;
            handlePresetChange();
            handleCalcValueChange();
        });
        ePresetDetailedSelect.addEventListener("change", function () {
            ePresetShortSelect.selectedIndex = ePresetDetailedSelect.selectedIndex;
            eCalcRateInput.value = ePresetDetailedSelect.value;
            handlePresetChange();
            handleCalcValueChange();
        });

        // Handling calc radio input change
        document.addEventListener("change", (e) => {
            if (e.target.type === "radio" && e.target.name === calcRadioGroupName) {
                setCalcFieldLockStatus(eCalcRateInput, e.target.value === "0");
                setCalcFieldLockStatus(eCalcUntaxedInput, e.target.value === "1");
                setCalcFieldLockStatus(eCalcTaxedInput, e.target.value === "2");

                ePresetDetailedSelect.disabled = e.target === eCalcRateRadio;
                ePresetShortSelect.disabled = e.target === eCalcRateRadio;
            }
        });
        eCalcRateRadio.addEventListener("change", function () {
            ePresetShortSelect.selectedIndex = 0;
            ePresetDetailedSelect.selectedIndex = 0;
            handlePresetChange();
        });

        // Handling decimal places options
        eButtonDecimalPlacesMinus.addEventListener("click", function () {
            changeDecimalPlacesDesiredCount(-1);
            handleDecimalConfigChange();
            handleCalcValueChange();
        });
        eButtonDecimalPlacesPlus.addEventListener("click", function () {
            changeDecimalPlacesDesiredCount(1);
            handleDecimalConfigChange();
            handleCalcValueChange();
        });
        eInputDecimalPlaces.addEventListener("change", function() {
            changeDecimalPlacesDesiredCount(0);
            handleDecimalConfigChange();
            handleCalcValueChange();
        });
        eInputDecimalPlaces.addEventListener("mousewheel", function(e) {
            // Handling wheel scroll on count field.
            if(e.wheelDelta < 0) {
                changeDecimalPlacesDesiredCount(-1);
            } else {
                changeDecimalPlacesDesiredCount(1);
            }
            handleDecimalConfigChange();
            handleCalcValueChange();
        });

        // Handling other DecimalJs config fields
        eRoundingModeSelect.addEventListener("change", function() {
            handleDecimalConfigChange();
            handleCalcValueChange();
        });

        // Handling the calculator field changes
        eCalcRateInput.addEventListener("change", function() {
            ePresetShortSelect.selectedIndex = 0;
            ePresetDetailedSelect.selectedIndex = 0;
            handleCalcValueChange();
            handlePresetChange();
        });
        eCalcUntaxedInput.addEventListener("change", function() {
            handleCalcValueChange();
        });
        eCalcTaxedInput.addEventListener("change", function() {
            handleCalcValueChange();
        });

        handlePresetDetailLevelChange();
        handleDecimalConfigChange();
        handlePresetChange();
    }
}