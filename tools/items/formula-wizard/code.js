import { Decimal } from "../../../resources/DecimalJs/10.4.3/decimal.min.mjs";
const version = [0, 0, 1];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
const startTime = new Date().getMilliseconds();
Decimal.set({ precision: 25, rounding: 8 });
function isStringValidNumber(text) {
    return isNaN(parseFloat(text));
}
console.debug("Preparing langs...");
const langKey = document.documentElement.lang.match("(en|fr)") ? document.documentElement.lang : "en";
const langData = {
    en: {
        "unit.any.name": "Not Important",
        "unit.watt.name": "Watt",
        "unit.ampere.name": "Ampere",
        "unit.ohm.name": "Ohm",
        "unit.ohm.desc": "Electrical Resistance",
        "unit.volt.name": "Volt",
        "unit.farad.name": "Farad",
        "error.formulaValue.noParent": "Attempting to get a formula's value whose parent formula isn't set !",
        "error.formulaValue.noSource": "Attempting to get a formula's value whose value source is null !",
        "error.formulaContext.tooSmall": "The current calculation context is too small !",
        "ui.formulaCount": "formulas",
        "formula.ohm_law.name": "Ohm's Law",
        "dataset.resistor-e3.name": "E3 IEC Resistors",
        "dataset.resistor-e3.desc": "???",
        "dataset.resistor-e6.name": "E6 IEC Resistors",
        "dataset.resistor-e6.desc": "???",
        "dataset.resistor-e12.name": "E12 IEC Resistors",
        "dataset.resistor-e12.desc": "???",
        "dataset.resistor-e24.name": "E24 IEC Resistors",
        "dataset.resistor-e24.desc": "???",
        "dataset.resistor-e48.name": "E48 IEC Resistors",
        "dataset.resistor-e48.desc": "???",
        "dataset.capacitor-iec.name": "IEC E24 Capacitors",
        "dataset.capacitor-iec.desc": "???",
        "context.type.disabled.name": "Disabled",
        "context.type.constant.name": "Constant",
        "context.type.continuous.name": "Continuous",
        "context.type.valueRange.name": "Value Range",
        "context.type.dataSetRange.name": "Set-based Range",
        "context.type.disabled.desc": "???",
        "context.type.constant.desc": "???",
        "context.type.continuous.desc": "???",
        "context.type.valueRange.desc": "???",
        "context.type.dataSetRange.desc": "???",
    },
    fr: {
        "unit.ampere.name": "Ampère",
        "unit.ohm.desc": "Résistance électrique",
        "_error.formulaValue.noParent": "",
        "_error.formulaValue.noSource": "",
        "ui.formulaCount": "formules",
        "formula.ohm_law.name": "Loi d'Ohm",
        "context.type.disabled.name": "Désactivé",
        "context.type.constant.name": "Constante",
        "context.type.continuous.name": "Continue",
        "context.type.valueRange.name": "Valeurs distinctes",
        "context.type.dataSetRange.name": "Set de valeurs",
    }
};
function localize(stringKey) {
    let _langData = langKey in langData ? langData[langKey] : langData.en;
    return stringKey in _langData ? _langData[stringKey] : (stringKey in langData["en"] ? langData["en"][stringKey] : stringKey);
}
console.debug("Preparing scales...");
const scales = {
    SI: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_DISTANCE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_WEIGHT: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    TIME_SECONDS: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    NONE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.name;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
};
const scaleFactors = {
    SI_GIGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e9');
            this.prefix = "giga";
            this.suffix = "";
            this.symbol = "G";
        }
    },
    SI_MEGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e6');
            this.prefix = "mega";
            this.suffix = "";
            this.symbol = "M";
        }
    },
    SI_KILO: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e3');
            this.prefix = "kilo";
            this.suffix = "";
            this.symbol = "k";
        }
    },
    SI_BASE: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    SI_CENTI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-2');
            this.prefix = "centi";
            this.suffix = "";
            this.symbol = "c";
        }
    },
    SI_MILLI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_MILLI: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_BASE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_MINUTE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('60');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_HOUR: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('3600');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_DAY: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('86400');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
};
Object.keys(scaleFactors).forEach(scaleFactorKey => {
    const scaleFactor = scaleFactors[scaleFactorKey];
    scaleFactor.scale.scaleFactors.push(scaleFactor);
});
function scaleToBase(value, scaleFactor) {
    return value.times(scaleFactor.multiplier);
}
function scaleFromBase(value, scaleFactor) {
    return value.dividedBy(scaleFactor.multiplier);
}
function getScaleKeyFromValue(scaleFactor) {
    return Object.keys(scaleFactors).find(scaleFactorKey => (scaleFactors[scaleFactorKey]) === scaleFactor);
}
function populateScaleSelectForUnit(unit, eSelect, selectedScaleFactor) {
    unit.scale.scaleFactors.forEach(scaleFactor => {
        const eNewScaleOption = document.createElement("option");
        eNewScaleOption.setAttribute("value", getScaleKeyFromValue(scaleFactor));
        eNewScaleOption.innerText = scaleFactor.prefix + " - " + eNewScaleOption.getAttribute("value");
        eNewScaleOption.selected = (scaleFactor === selectedScaleFactor);
        eSelect.appendChild(eNewScaleOption);
    });
}
console.debug("Preparing units...");
class Unit {
    constructor(unitKey, symbol, scale) {
        this.name = localize("unit." + unitKey + ".name");
        this.symbol = symbol;
        this.scale = scale;
        this.description = localize("unit." + unitKey + ".desc");
    }
}
const units = {
    ANY: new Unit("any", "", scales.NONE),
    WATT: new Unit("watt", "W", scales.SI),
    VOLT: new Unit("volt", "V", scales.SI),
    AMPERE: new Unit("ampere", "A", scales.SI),
    OHM: new Unit("ohm", "Ω", scales.SI),
    FARAD: new Unit("farad", "F", scales.SI),
    METER: new Unit("meter", "m", scales.SI),
    INCH: new Unit("inch", "in", scales.IMPERIAL_DISTANCE),
    POUND: new Unit("pound", "p", scales.IMPERIAL_WEIGHT),
};
console.debug("Preparing formulas...");
class FormulaContextHandler {
    constructor(contextValueIndex) {
        this.contextValueIndex = contextValueIndex;
    }
    getContextValue(context) {
        if (context.length <= this.contextValueIndex) {
            alert(localize("error.formulaContext.tooSmall"));
            throw new Error(localize("error.formulaContext.tooSmall"));
        }
        return context[this.contextValueIndex];
    }
}
class FormulaValue {
    constructor(unit, scaleFactor) {
        this.unit = unit;
        this.scaleFactor = scaleFactor;
        this.parentFormula = null;
        this.valueSource = null;
    }
    getFormulaValue(context) {
        if (this.parentFormula === null) {
            alert(localize("error.formulaValue.noParent"));
            throw new Error(localize("error.formulaValue.noParent"));
        }
        if (this.valueSource === null) {
            alert(localize("error.formulaValue.noSource"));
            throw new Error(localize("error.formulaValue.noSource"));
        }
        if (this.valueSource instanceof FormulaContextHandler) {
            return this.valueSource.getContextValue(context);
        }
        return scaleFromBase(scaleToBase(this.valueSource.getVariantValue(this.parentFormula, context), this.valueSource.getOutputValueDefinition().scaleFactor), this.scaleFactor);
    }
}
class Formula {
    constructor(values, variants, formulaKey, categories, wikiLink) {
        this.values = values;
        this.variants = variants;
        this.formulaKey = formulaKey;
        this.name = localize("formula." + formulaKey + ".name");
        this.description = localize("formula." + formulaKey + ".desc");
        this.categories = categories;
        this.wikiLink = wikiLink;
        this.values.forEach(value => {
            value.parentFormula = this;
        });
    }
    getClone() {
        const clonedFormulaValues = [];
        this.values.forEach(originalValue => {
            clonedFormulaValues.push(new FormulaValue(originalValue.unit, originalValue.scaleFactor));
        });
        return new Formula(clonedFormulaValues, this.variants, this.formulaKey, this.categories, this.wikiLink);
    }
}
const formulas = {
    OHM_LAW: new Formula([
        new FormulaValue(units.OHM, scaleFactors.SI_BASE),
        new FormulaValue(units.AMPERE, scaleFactors.SI_BASE),
        new FormulaValue(units.VOLT, scaleFactors.SI_BASE),
    ], [
        new class {
            constructor() {
                this.description = "V=I*R";
                this.getVariantValue = (formula, context) => {
                    return formula.values[0].getFormulaValue(context).times(formula.values[1].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[0], this.parentFormula.values[1]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[2];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mo>=</mo><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>*</mo><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></math>";
                };
                this.parentFormula = null;
            }
        },
        new class {
            constructor() {
                this.description = "I=V/R";
                this.getVariantValue = (formula, context) => {
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[0].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[0], this.parentFormula.values[2]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[1];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi></mfrac></math>";
                };
                this.parentFormula = null;
            }
        },
        new class {
            constructor() {
                this.description = "R=V/I";
                this.getVariantValue = (formula, context) => {
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[1].getFormulaValue(context));
                };
                this.getInputValuesDefinition = () => {
                    return [this.parentFormula.values[2], this.parentFormula.values[1]];
                };
                this.getOutputValueDefinition = () => {
                    return this.parentFormula.values[0];
                };
                this.getMathMl = (formula) => {
                    return "<math><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></mfrac></math>";
                };
                this.parentFormula = null;
            }
        },
    ], "ohm_law", ["electricity"], new URL("https://wikipedia.org/wiki/Ohm's_law")),
};
Object.keys(formulas).forEach(formulaKey => {
    formulas[formulaKey].variants.forEach(formulaVariant => {
        formulaVariant.parentFormula = formulas[formulaKey];
    });
});
class ContextType {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
const contextTypes = {
    DISABLED: new ContextType(localize("context.type.disabled.name"), localize("context.type.disabled.desc")),
    CONSTANT: new ContextType(localize("context.type.constant.name"), localize("context.type.constant.desc")),
    CONTINUOUS: new ContextType(localize("context.type.continuous.name"), localize("context.type.continuous.desc")),
    VALUE_RANGE: new ContextType(localize("context.type.valueRange.name"), localize("context.type.valueRange.desc")),
    DATASET_RANG: new ContextType(localize("context.type.dataSetRange.name"), localize("context.type.dataSetRange.desc")),
};
console.debug("Preparing sets...");
class DataSet {
    constructor(name, description, values, unit, scaleFactor) {
        this.name = name;
        this.description = description;
        this.values = values;
        this.unit = unit;
        this.scaleFactor = scaleFactor;
        if (unit.scale != scaleFactor.scale) {
            alert("");
            throw Error("");
        }
    }
    getDataSet() {
        return this.values;
    }
}
const e3Range = [1, 2.2, 4.7];
const e6Range = [1, 1.5, 2.2, 3.3, 4.7, 6.8];
const e12Range = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
const e24Range = [
    1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
];
const e48Range = [
    1, 1.05, 1.1, 1.15, 1.21, 1.27, 1.33, 1.4, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49,
    2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.9, 6.19,
    6.49, 6.81, 7.15, 7.5, 7.87, 8.25, 8.66, 9.09, 9.53
];
const resistorsScales = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
const capacitorScales = [10e-12, 10e-11, 10e-10, 10e-9, 10e-8, 10e-7, 10e-6, 10e-5, 10e-4, 10e-3, 10e-2];
const sets = {
    RESISTOR_E3: new DataSet(localize("dataset.resistor-e3.name"), localize("dataset.resistor-e3.desc"), resistorsScales.flatMap((e3Scale) => e3Range.map((e3Multiplier) => new Decimal(e3Scale).times(e3Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E6: new DataSet(localize("dataset.resistor-e6.name"), localize("dataset.resistor-e6.desc"), resistorsScales.flatMap((e6Scale) => e6Range.map((e6Multiplier) => new Decimal(e6Scale).times(e6Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E12: new DataSet(localize("dataset.resistor-e12.name"), localize("dataset.resistor-e12.desc"), resistorsScales.flatMap((e12Scale) => e12Range.map((e12Multiplier) => new Decimal(e12Scale).times(e12Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E24: new DataSet(localize("dataset.resistor-e24.name"), localize("dataset.resistor-e24.desc"), resistorsScales.flatMap((e24Scale) => e24Range.map((e24Multiplier) => new Decimal(e24Scale).times(e24Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E48: new DataSet(localize("dataset.resistor-e48.name"), localize("dataset.resistor-e48.desc"), resistorsScales.flatMap((e48Scale) => e48Range.map((e48Multiplier) => new Decimal(e48Scale).times(e48Multiplier))), units.OHM, scaleFactors.SI_BASE),
    CAPACITOR_IEC: new DataSet(localize("dataset.capacitor-iec.name"), localize("dataset.capacitor-iec.desc"), capacitorScales.flatMap((cScale) => e24Range.map((eMultiplier) => new Decimal(cScale).times(eMultiplier))), units.FARAD, scaleFactors.SI_BASE),
};
console.debug("Preparing UI...");
const idWorkbenchFormulaPrefix = "fw-workbench-formula-";
const idWorkbenchFormulaSpawnPoint = idWorkbenchFormulaPrefix + "spawn";
const idTemplateFormula = "template-workbench-formula";
const idFormulaName = idWorkbenchFormulaPrefix + "name";
const idFormulaInputs = idWorkbenchFormulaPrefix + "inputs";
const idFormulaOutputs = idWorkbenchFormulaPrefix + "outputs";
const classTemplateFormulaValue = "formula-value-input-form";
const idTemplateFormulaValue = idTemplateFormula + "-value";
const idFormulaValuePrefix = idWorkbenchFormulaPrefix + "value-";
const idFormulaValueId = idFormulaValuePrefix + "id";
const idFormulaValueName = idFormulaValuePrefix + "name";
const idFormulaValueLink = idFormulaValuePrefix + "link";
const idFormulaValueTestValue = idFormulaValuePrefix + "test-value";
const idFormulaValueTestScale = idFormulaValuePrefix + "test-scale";
const idFormulaValueTestValueSet = idFormulaValuePrefix + "test-value-set";
let eTemplateWorkbenchFormula = document.getElementById(idTemplateFormula);
let eTemplateWorkbenchFormulaValue = document.getElementById(idTemplateFormulaValue);
if (eTemplateWorkbenchFormula === null || eTemplateWorkbenchFormulaValue === null) {
    alert("error.ui.workbench.noTemplate");
    throw Error("error.ui.workbench.noTemplate");
}
eTemplateWorkbenchFormula = eTemplateWorkbenchFormula.cloneNode(true).content;
eTemplateWorkbenchFormulaValue = eTemplateWorkbenchFormulaValue.cloneNode(true).content;
const eWorkbenchFormulaSpawnPoint = document.querySelector(`a#${idWorkbenchFormulaSpawnPoint}`);
if (eWorkbenchFormulaSpawnPoint === null) {
    alert("error.ui.workbench.noAnchor");
    throw Error("error.ui.workbench.noAnchor");
}
let uiWorkbenchFormulas = [];
var WorkbenchFormulaValueTypes;
(function (WorkbenchFormulaValueTypes) {
    WorkbenchFormulaValueTypes[WorkbenchFormulaValueTypes["INPUT"] = 0] = "INPUT";
    WorkbenchFormulaValueTypes[WorkbenchFormulaValueTypes["OUTPUT"] = 1] = "OUTPUT";
})(WorkbenchFormulaValueTypes || (WorkbenchFormulaValueTypes = {}));
class WorkbenchFormulaValueUiElement {
    constructor(rootElement, formulaValue, parentFormulaElement, valueType) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString() + Math.floor(Math.random() * 99);
        this.valueType = valueType;
        this.formulaValue = formulaValue;
        this.parentFormulaElement = parentFormulaElement;
        this.eFormulaValueId = rootElement.querySelector(`input#${idFormulaValueId}`);
        this.eFormulaValueName = rootElement.querySelector(`p#${idFormulaValueName}`);
        this.eFormulaValueLink = rootElement.querySelector(`select#${idFormulaValueLink}`);
        this.eFormulaValueTestValue = rootElement.querySelector(`input#${idFormulaValueTestValue}`);
        this.eFormulaValueTestScale = rootElement.querySelector(`select#${idFormulaValueTestScale}`);
        this.eFormulaValueTestValueSet = rootElement.querySelector(`select#${idFormulaValueTestValueSet}`);
        if ([this.eFormulaValueId, this.eFormulaValueName, this.eFormulaValueLink, this.eFormulaValueTestValue,
            this.eFormulaValueTestScale, this.eFormulaValueTestValueSet].some((item) => item === null)) {
            alert("error.ui.formula.value.missingElement");
            throw Error("error.ui.formula.value.missingElement");
        }
        this.toggleField(this.eFormulaValueTestValueSet, true);
        this.rootElement.querySelectorAll(`input, select, p, div`).forEach(eFormInput => {
            if (eFormInput.hasAttribute("id")) {
                eFormInput.setAttribute("id", eFormInput.getAttribute("id") + this.idSuffix);
            }
        });
        this.rootElement.querySelectorAll(`label`).forEach(eFormLabel => {
            if (eFormLabel.hasAttribute("for")) {
                eFormLabel.setAttribute("for", eFormLabel.getAttribute("for") + this.idSuffix);
            }
        });
        this.eFormulaValueName.innerText = `${this.formulaValue.unit.name} (${this.formulaValue.unit.symbol})`;
        this.eFormulaValueId.value = this.idSuffix;
        populateScaleSelectForUnit(this.formulaValue.unit, this.eFormulaValueTestScale, this.formulaValue.scaleFactor);
        if (this.valueType === WorkbenchFormulaValueTypes.INPUT) {
            this.setupInput();
        }
        else {
            this.setupOutput();
        }
    }
    onTestFieldChange(event) {
        this.parentFormulaElement.calculateTestValues();
    }
    getTestValue() {
        return new Decimal(isStringValidNumber(this.eFormulaValueTestValue.value) ? this.eFormulaValueTestValue.value : 0);
    }
    setTestValue(newValue) {
        this.eFormulaValueTestValue.value = newValue.toString();
    }
    toggleTestMode(hidden) {
        this.eFormulaValueTestScale.parentNode.parentNode.hidden = hidden;
        this.eFormulaValueTestScale.parentNode.parentNode.hidden = hidden;
    }
    toggleField(eFormField, hidden) {
        eFormField.parentNode.parentNode.hidden = hidden;
    }
    setupInput() {
        this.toggleField(this.eFormulaValueId, true);
        this.eFormulaValueTestValue.value = "0";
        this.eFormulaValueTestValue.onchange = this.onTestFieldChange.bind(this);
        this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }
    setupOutput() {
        this.toggleField(this.eFormulaValueLink, true);
        this.eFormulaValueTestValue.readOnly = true;
        this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }
    static getNew(formulaValue, parentFormulaElement, valueType) {
        const eNewWorkbenchFormulaValue = eTemplateWorkbenchFormulaValue.cloneNode(true).firstElementChild;
        if (eNewWorkbenchFormulaValue === null) {
            alert("error.ui.workbench.formula.value.cannotGetElement");
            throw Error("error.ui.workbench.formula.value.cannotGetElement");
        }
        return new WorkbenchFormulaValueUiElement(eNewWorkbenchFormulaValue, formulaValue, parentFormulaElement, valueType);
    }
}
class WorkbenchFormulaUiElement {
    constructor(rootElement, formulaVariant) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString();
        this.formulaVariant = formulaVariant;
        this.eFormulaName = rootElement.querySelector(`p#${idFormulaName}`);
        this.eFormulaInputs = rootElement.querySelector(`div#${idFormulaInputs}`);
        this.eFormulaOutputs = rootElement.querySelector(`div#${idFormulaOutputs}`);
        if ([this.eFormulaName, this.eFormulaInputs, this.eFormulaOutputs].some((item) => item === null)) {
            alert("error.ui.formula.missingElement");
            throw Error("error.ui.formula.missingElement");
        }
        this.eFormulaName.innerText = this.formulaVariant.parentFormula.name;
        this.inputValueElements = [];
        this.formulaVariant.getInputValuesDefinition().forEach(variantValue => {
            const newInputValueElement = WorkbenchFormulaValueUiElement.getNew(variantValue, this, WorkbenchFormulaValueTypes.INPUT);
            this.inputValueElements.push(newInputValueElement);
            this.eFormulaInputs.appendChild(newInputValueElement.rootElement);
        });
        this.outputValueElements = [];
        [this.formulaVariant.getOutputValueDefinition()].forEach(variantValue => {
            const newOutputValueElement = WorkbenchFormulaValueUiElement.getNew(variantValue, this, WorkbenchFormulaValueTypes.OUTPUT);
            this.outputValueElements.push(newOutputValueElement);
            this.eFormulaOutputs.appendChild(newOutputValueElement.rootElement);
        });
    }
    toggleTestMode(hidden) {
    }
    calculateTestValues() {
        console.log("Handling change...");
    }
    static createNew(formulaVariant) {
        const eNewWorkbenchFormula = eTemplateWorkbenchFormula.cloneNode(true).firstElementChild;
        if (eNewWorkbenchFormula === null) {
            alert("error.ui.workbench.formula.cannotGetElement");
            throw Error("error.ui.workbench.formula.cannotGetElement");
        }
        const newWorkbenchUiElement = new WorkbenchFormulaUiElement(eNewWorkbenchFormula, formulaVariant);
        uiWorkbenchFormulas.push(newWorkbenchUiElement);
        eWorkbenchFormulaSpawnPoint.parentNode.insertBefore(newWorkbenchUiElement.rootElement, eWorkbenchFormulaSpawnPoint);
        return newWorkbenchUiElement;
    }
}
const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-";
const idCatalogCategoryCount = idCatalogPrefix + "formula-count";
const eCategoryContainers = {};
document.querySelectorAll('[id]').forEach((element) => {
    if (element.id.startsWith(idCatalogCategoryPrefix)) {
        eCategoryContainers[element.id.replace(idCatalogCategoryPrefix, "")] = element;
    }
});
const eFormulaCount = document.getElementById(idCatalogCategoryCount);
if (eFormulaCount !== null) {
    eFormulaCount.innerText = Object.keys(formulas).length.toString();
}
let eTemplateFormula = document.getElementById("template-formula-available");
let eTemplateFormulaVariant = document.getElementById("template-formula-available-variant");
if (eTemplateFormula === null || eTemplateFormulaVariant === null) {
    alert("error.ui.catalog.noTemplate");
    throw Error("error.ui.catalog.noTemplate");
}
Object.keys(formulas).forEach(formulaKey => {
    const hasValidCategory = formulas[formulaKey].categories.every(function (categoryId) {
        return Object.keys(eCategoryContainers).indexOf(categoryId) !== -1;
    });
    if (hasValidCategory) {
        let eNewFormula = eTemplateFormula.content.cloneNode(true);
        let eNewFormulaTitle = eNewFormula.querySelector("p");
        if (eNewFormulaTitle !== null) {
            eNewFormulaTitle.innerText = formulas[formulaKey].name;
        }
        let eNewFormulaVariants = eNewFormula.querySelector("div.fw-variants");
        if (eNewFormulaVariants === null) {
            alert("");
            throw Error("");
        }
        eNewFormulaVariants.innerHTML = "";
        formulas[formulaKey].variants.forEach(variant => {
            let eNewFormulaVariant = eTemplateFormulaVariant.content.cloneNode(true);
            let eNewFormulaVariantButton = eNewFormulaVariant.querySelector("button");
            if (eNewFormulaVariantButton === null) {
                alert("");
                throw Error("");
            }
            eNewFormulaVariantButton.innerHTML = variant.getMathMl(formulas[formulaKey]);
            eNewFormulaVariantButton.title = variant.description;
            eNewFormulaVariantButton.onclick = function () {
                WorkbenchFormulaUiElement.createNew(variant);
            };
            eNewFormulaVariants.appendChild(eNewFormulaVariant);
        });
        formulas[formulaKey].categories.forEach(categoryKey => {
            if (Object.keys(eCategoryContainers).includes(categoryKey)) {
                eCategoryContainers[categoryKey].appendChild(eNewFormula);
            }
        });
    }
});
const idContextComponentPrefix = "fw-context-component-";
const idContextComponentId = idContextComponentPrefix + "id";
const idContextComponentDelete = idContextComponentPrefix + "delete";
const idContextComponentTypes = idContextComponentPrefix + "type";
const idContextComponentManualValue = idContextComponentPrefix + "manual-value";
const idContextComponentManualValues = idContextComponentManualValue + "s";
const idContextComponentRangeFrom = idContextComponentPrefix + "range-from";
const idContextComponentRangeTo = idContextComponentPrefix + "range-to";
const idContextComponentRangeStep = idContextComponentPrefix + "range-step";
const idContextComponentSets = idContextComponentPrefix + "set";
const idContextComponentUnit = idContextComponentPrefix + "unit";
const idContextComponentScale = idContextComponentPrefix + "scale";
let uiContextComponents = [];
let eTemplateContextComponent = document.getElementById("template-context-component");
if (eTemplateContextComponent === null) {
    alert("error.ui.context.noTemplate");
    throw Error("error.ui.context.noTemplate");
}
eTemplateContextComponent = eTemplateContextComponent.cloneNode(true).content;
const eContextTypes = eTemplateContextComponent.getElementById(idContextComponentTypes);
const eContextSets = eTemplateContextComponent.getElementById(idContextComponentSets);
const eContextUnits = eTemplateContextComponent.getElementById(idContextComponentUnit);
const eContextScales = eTemplateContextComponent.getElementById(idContextComponentScale);
if ([eContextTypes, eContextSets, eContextUnits, eContextScales].some((item) => item === null)) {
    alert("error.ui.context.noSets");
    throw Error("error.ui.context.noSets");
}
Object.keys(contextTypes).forEach(value => {
    const eNewContextTypesOption = document.createElement("option");
    eNewContextTypesOption.setAttribute("value", value);
    eNewContextTypesOption.innerText = contextTypes[value].name;
    eContextTypes.appendChild(eNewContextTypesOption);
});
Object.keys(sets).forEach(value => {
    const eNewContextSetsOption = document.createElement("option");
    eNewContextSetsOption.setAttribute("value", value);
    eNewContextSetsOption.innerText = sets[value].name;
    eContextSets.appendChild(eNewContextSetsOption);
});
Object.keys(units).forEach(unitKey => {
    const eNewContextUnitsOption = document.createElement("option");
    eNewContextUnitsOption.setAttribute("value", unitKey);
    eNewContextUnitsOption.innerText = units[unitKey].name;
    eContextUnits.appendChild(eNewContextUnitsOption);
});
Object.keys(scaleFactors).forEach(scaleKey => {
    const eNewContextScalesOption = document.createElement("option");
    eNewContextScalesOption.setAttribute("value", scaleKey);
    eNewContextScalesOption.innerText = scaleFactors[scaleKey].prefix;
    eContextScales.appendChild(eNewContextScalesOption);
});
let eContextStatusMessage = document.getElementById("fw-text-context-middle");
if (eContextStatusMessage === null) {
    alert("error.ui.context.noStatus");
    throw Error("error.ui.context.noStatus");
}
let eContextAddButton = document.querySelector("button#fw-button-add-context");
if (eContextAddButton === null) {
    alert("error.ui.context.missingButton");
    throw Error("error.ui.context.missingButton");
}
class ContextComponentUiElement {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString();
        this.eIdLabel = rootElement.querySelector(`label[for="${idContextComponentId}"]`);
        this.eIdInput = rootElement.querySelector(`input#${idContextComponentId}`);
        this.eDeleteButton = rootElement.querySelector(`button#${idContextComponentDelete}`);
        this.eTypeLabel = rootElement.querySelector(`label[for="${idContextComponentTypes}"]`);
        this.eTypeSelect = rootElement.querySelector(`select#${idContextComponentTypes}`);
        this.eManualValueLabel = rootElement.querySelector(`label[for="${idContextComponentManualValue}"]`);
        this.eManualValueInput = rootElement.querySelector(`input#${idContextComponentManualValue}`);
        this.eManualValuesLabel = rootElement.querySelector(`label[for="${idContextComponentManualValues}"]`);
        this.eManualValuesInput = rootElement.querySelector(`input#${idContextComponentManualValues}`);
        this.eRangeFromLabel = rootElement.querySelector(`label[for="${idContextComponentRangeFrom}"]`);
        this.eRangeFromInput = rootElement.querySelector(`input#${idContextComponentRangeFrom}`);
        this.eRangeToLabel = rootElement.querySelector(`label[for="${idContextComponentRangeTo}"]`);
        this.eRangeToInput = rootElement.querySelector(`input#${idContextComponentRangeTo}`);
        this.eRangeStepLabel = rootElement.querySelector(`label[for="${idContextComponentRangeStep}"]`);
        this.eRangeStepInput = rootElement.querySelector(`input#${idContextComponentRangeStep}`);
        this.eDataSetLabel = rootElement.querySelector(`label[for="${idContextComponentSets}"]`);
        this.eDataSetSelect = rootElement.querySelector(`select#${idContextComponentSets}`);
        this.eUnitLabel = rootElement.querySelector(`label[for="${idContextComponentUnit}"]`);
        this.eUnitSelect = rootElement.querySelector(`select#${idContextComponentUnit}`);
        this.eScaleLabel = rootElement.querySelector(`label[for="${idContextComponentScale}"]`);
        this.eScaleSelect = rootElement.querySelector(`select#${idContextComponentScale}`);
        this.allElements = [
            this.eIdLabel, this.eIdInput, this.eDeleteButton, this.eTypeLabel, this.eTypeSelect,
            this.eManualValuesLabel, this.eManualValuesInput, this.eRangeFromLabel, this.eRangeFromInput,
            this.eRangeToLabel, this.eRangeToInput, this.eRangeStepLabel, this.eRangeStepInput, this.eDataSetLabel,
            this.eDataSetSelect, this.eUnitLabel, this.eUnitSelect, this.eScaleLabel, this.eScaleSelect,
            this.eManualValueLabel, this.eManualValueInput
        ];
        if (this.allElements.some((item) => item === null)) {
            alert("error.ui.context.component.missingElement");
            throw Error("error.ui.context.component.missingElement");
        }
        rootElement.querySelectorAll(`input, select`).forEach(eFormInput => {
            if (eFormInput.hasAttribute("id")) {
                eFormInput.setAttribute("id", eFormInput.getAttribute("id") + this.idSuffix);
            }
        });
        rootElement.querySelectorAll(`label`).forEach(eFormLabel => {
            if (eFormLabel.hasAttribute("for")) {
                eFormLabel.setAttribute("for", eFormLabel.getAttribute("for") + this.idSuffix);
            }
        });
        this.eDeleteButton.removeAttribute('id');
        this.eIdInput.value = this.idSuffix;
        this.eTypeSelect.onchange = this.onTypeChange.bind(this);
        this.eDeleteButton.onclick = this.onDeleteClick.bind(this);
        this.onTypeChange(null);
    }
    onTypeChange(event) {
        this.allElements.forEach(eFormElement => {
            this.toggleField(eFormElement, true);
        });
        this.toggleField(this.eIdLabel, false);
        this.toggleField(this.eTypeLabel, false);
        if (this.getContextType() !== contextTypes.DISABLED) {
            this.toggleField(this.eUnitLabel, false);
            this.toggleField(this.eScaleLabel, false);
        }
        switch (this.getContextType()) {
            case contextTypes.CONSTANT:
                this.toggleField(this.eManualValueInput, false);
                break;
            case contextTypes.CONTINUOUS:
                this.toggleField(this.eRangeFromLabel, false);
                this.toggleField(this.eRangeToLabel, false);
                this.toggleField(this.eRangeStepLabel, false);
                break;
            case contextTypes.VALUE_RANGE:
                this.toggleField(this.eManualValuesInput, false);
                break;
            case contextTypes.DATASET_RANG:
                this.toggleField(this.eDataSetLabel, false);
                break;
        }
    }
    onDeleteClick(event) {
        this.rootElement.remove();
        uiContextComponents = uiContextComponents.filter(item => item !== this);
        if (uiContextComponents.length < 1) {
            eContextStatusMessage.hidden = false;
        }
    }
    toggleField(eFormField, hidden) {
        eFormField.parentNode.parentNode.hidden = hidden;
    }
    getContextType() {
        return contextTypes[this.eTypeSelect.value];
    }
}
eContextAddButton.onclick = function () {
    const eNewContextComponent = eTemplateContextComponent.cloneNode(true).firstElementChild;
    if (eNewContextComponent === null) {
        alert("error.ui.context.component.cannotGetElement");
        throw Error("error.ui.context.component.cannotGetElement");
    }
    const newContextComponent = new ContextComponentUiElement(eNewContextComponent);
    uiContextComponents.push(newContextComponent);
    eContextStatusMessage.parentNode.insertBefore(newContextComponent.rootElement, eContextStatusMessage);
    eContextStatusMessage.hidden = true;
};
function getRee() {
}
class NumberProlapsingMachine {
    static createNewFromUi(formulaVariant) {
        return null;
    }
}
if (new URLSearchParams(window.location.search).has("debug")) {
    console.debug("Preparing debugging tools...");
    let eDebugContainer = document.querySelector("div#fw-debug-root");
    let eDebugLinkAndIdsButton = document.querySelector("button#fw-button-debug-linkAndIds");
    if (eDebugContainer === null || eDebugLinkAndIdsButton === null) {
        alert("error.ui.context.missingButton");
        throw Error("error.ui.context.missingButton");
    }
    eDebugContainer.hidden = false;
    eDebugLinkAndIdsButton.onclick = function () {
        alert(JSON.stringify({ 'a': 1, 'b': 3 }, null, 4));
    };
}
const endTime = new Date().getMilliseconds();
console.log("Done, took " + (endTime - startTime) + "ms !");
//# sourceMappingURL=code.js.map