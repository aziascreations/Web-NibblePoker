import {Decimal} from '../../../resources/DecimalJs/10.4.3/decimal';
// Documentation: https://github.com/MikeMcl/decimal.js/

const version = [0, 0, 1];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
const startTime = new Date().getMilliseconds();

// Configuring the Decimal.JS library to use its maximum potential precision.
Decimal.set({ precision: 25, rounding: 8 });

// Random utils (Can be exported in other module)
function isStringValidNumber(text: string): boolean {
    // Can be replaced with regex if needed to be more strict.
    // I'd need to see if the "Decimal" library handles values like "42px" correctly.
    return isNaN(parseFloat(text));
}

// Common L10N stuff.
console.debug("Preparing langs...");
const langKey= document.documentElement.lang.match("(en|fr)") ? document.documentElement.lang : "en";
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

        // "error.ui.context.component.missingElement"
        // "error.ui.context.component.cannotGetElement"
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
}
function localize(stringKey: string): string {
    // @ts-ignore -> Implicit any on "langData[langKey]"
    let _langData = langKey in langData ? langData[langKey] : langData.en;
    return stringKey in _langData ? _langData[stringKey] : (
        // @ts-ignore -> Implicit any on " langData["en"][stringKey]"
        stringKey in langData["en"] ? langData["en"][stringKey] : stringKey
    );
}

// Preparing scales
console.debug("Preparing scales...");

interface UnitScale {
    formatName: (unit: Unit) => string;
    formatSymbol: (unit: Unit) => string;
    scaleFactors: UnitScaleFactor[];
}

interface UnitScaleFactor {
    scale: UnitScale

    prefix: string;
    suffix: string;
    symbol: string;

    /** Multiplier to go from scaled to base value */
    // Not the most intuitive IMO, but it is similar to the standard power notation for SI.
    multiplier: Decimal;
}

const scales = {
    SI: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    IMPERIAL_DISTANCE: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    IMPERIAL_WEIGHT: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    TIME_SECONDS: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    NONE: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.name
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
}

const scaleFactors: { [key: string]: UnitScaleFactor } = {
    SI_GIGA: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e9');
        prefix = "giga";
        suffix = "";
        symbol = "G";
    },
    SI_MEGA: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e6');
        prefix = "mega";
        suffix = "";
        symbol = "M";
    },
    SI_KILO: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e3');
        prefix = "kilo";
        suffix = "";
        symbol = "k";
    },
    SI_BASE: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    SI_CENTI: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e-2');
        prefix = "centi";
        suffix = "";
        symbol = "c";
    },
    SI_MILLI: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e-3');
        prefix = "milli";
        suffix = "";
        symbol = "m";
    },

    TIME_MILLI: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('1e-3');
        prefix = "milli";
        suffix = "";
        symbol = "m";
    },
    TIME_BASE: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('1');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_MINUTE: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('60');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_HOUR: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('3600');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_DAY: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('86400');
        prefix = "";
        suffix = "";
        symbol = "";
    },
}

// Adding "UnitScaleFactor" in their respective "UnitScale".
Object.keys(scaleFactors).forEach(scaleFactorKey => {
    // @ts-ignore - Ignoring BS implicit any.
    const scaleFactor: UnitScaleFactor = scaleFactors[scaleFactorKey];
    scaleFactor.scale.scaleFactors.push(scaleFactor);
});

function scaleToBase(value: Decimal, scaleFactor: UnitScaleFactor): Decimal {
    return value.times(scaleFactor.multiplier);
}

function scaleFromBase(value: Decimal, scaleFactor: UnitScaleFactor): Decimal {
    return value.dividedBy(scaleFactor.multiplier);
}

function getScaleKeyFromValue(scaleFactor: UnitScaleFactor): string {
    return Object.keys(scaleFactors).find(
        scaleFactorKey => (scaleFactors[scaleFactorKey]) === scaleFactor
    )!;
}

function populateScaleSelectForUnit(unit: Unit, eSelect: HTMLSelectElement, selectedScaleFactor: UnitScaleFactor | null) {
    unit.scale.scaleFactors.forEach(scaleFactor => {
        const eNewScaleOption = document.createElement("option");
        eNewScaleOption.setAttribute("value", getScaleKeyFromValue(scaleFactor));
        eNewScaleOption.innerText = scaleFactor.prefix + " - " + eNewScaleOption.getAttribute("value");
        eNewScaleOption.selected = (scaleFactor === selectedScaleFactor);
        eSelect.appendChild(eNewScaleOption);
    });
}

// Preparing units
console.debug("Preparing units...");

class Unit {
    name: string;
    symbol: string;
    description: string;
    scale: UnitScale;

    constructor(unitKey: string, symbol: string, scale: UnitScale) {
        this.name = localize("unit." + unitKey + ".name");
        this.symbol = symbol;
        this.scale = scale;
        this.description = localize("unit." + unitKey + ".desc");
    }
}

const units: { [key: string]: Unit } = {
    ANY: new Unit("any", "", scales.NONE),

    WATT: new Unit("watt", "W", scales.SI),
    VOLT: new Unit("volt", "V", scales.SI),
    AMPERE: new Unit("ampere", "A", scales.SI),
    OHM: new Unit("ohm", "Ω", scales.SI),
    FARAD: new Unit("farad", "F", scales.SI),
    METER: new Unit("meter", "m", scales.SI),

    INCH: new Unit("inch", "in", scales.IMPERIAL_DISTANCE),
    POUND: new Unit("pound", "p", scales.IMPERIAL_WEIGHT),
}

// ----------------
//  User Interface
// ----------------
console.debug("Preparing formulas...");

type FormulaContext = Decimal[];

class FormulaContextHandler {
    contextValueIndex: number;

    constructor(contextValueIndex: number) {
        this.contextValueIndex = contextValueIndex
    }

    getContextValue(context: FormulaContext): Decimal {
        if(context.length <= this.contextValueIndex) {
            alert(localize("error.formulaContext.tooSmall"));
            throw new Error(localize("error.formulaContext.tooSmall"));
        }
        return context[this.contextValueIndex];
    }
}

class FormulaValue {
    unit: Unit;
    scaleFactor: UnitScaleFactor;

    // Set when preparing the final formula chain
    parentFormula: Formula | null;
    valueSource: FormulaVariant | FormulaContextHandler | null;  // TODO: Add context fetcher

    constructor(unit: Unit, scaleFactor: UnitScaleFactor) {
        this.unit = unit;
        this.scaleFactor = scaleFactor;
        this.parentFormula = null;
        this.valueSource = null;
    }

    getFormulaValue(context: FormulaContext): Decimal {
        // Should be set when preparing the formula chain for calculations
        if(this.parentFormula === null) {
            alert(localize("error.formulaValue.noParent"));
            throw new Error(localize("error.formulaValue.noParent"));
        }
        if(this.valueSource === null) {
            alert(localize("error.formulaValue.noSource"));
            throw new Error(localize("error.formulaValue.noSource"));
        }
        if(this.valueSource instanceof FormulaContextHandler) {
            return this.valueSource.getContextValue(context);
        }
        // We can safely assume that "this.valueSource" is an instance of "FormulaVariant".
        return scaleFromBase(
            scaleToBase(
                this.valueSource.getVariantValue(this.parentFormula, context),
                this.valueSource.getOutputValueDefinition().scaleFactor
            ),
            this.scaleFactor
        );
    }
}

class Formula {
    values: FormulaValue[];
    variants: FormulaVariant[];
    name: string;
    description: string;
    formulaKey: string

    categories: string[];

    wikiLink: URL;

    constructor(values: FormulaValue[], variants: FormulaVariant[], formulaKey: string, categories: string[],
                wikiLink: URL) {
        this.values = values;
        this.variants = variants;
        this.formulaKey = formulaKey;
        this.name = localize("formula." + formulaKey + ".name");
        this.description = localize("formula." + formulaKey + ".desc");
        this.categories = categories;
        this.wikiLink = wikiLink;

        // Adding references to "Formula" in each "FormulaValue"
        this.values.forEach(value => {
            value.parentFormula = this;
        })
    }

    getClone(): Formula {
        // Making a semi-deep clone of the "Formula" itself and its "FormulaValues".
        // We can keep the "FormulaVariant" identical since they only contain static code.
        // We couldn't use "structuredClone" since the "Unit" class were getting cloned and couldn't be.
        const clonedFormulaValues: FormulaValue[] = [];
        this.values.forEach(originalValue => {
            clonedFormulaValues.push(
                new FormulaValue(
                    originalValue.unit,
                    originalValue.scaleFactor,
                )
            );
        });
        return new Formula(
            clonedFormulaValues,
            this.variants,
            this.formulaKey,
            this.categories,
            this.wikiLink,
        );
    }
}

interface FormulaVariant {
    // TODO: Use HTML5 math formula tags
    //id: string
    description: string
    getVariantValue: (formula: Formula, context: FormulaContext) => Decimal;
    getInputValuesDefinition: () => FormulaValue[];
    getOutputValueDefinition: () => FormulaValue;
    getMathMl: (formula: Formula) => string;
    parentFormula: Formula;  // Set to null when instantiating, set to proper parent right after.
}

const formulas: { [key: string]: Formula } = {
    OHM_LAW: new Formula(
        [
            new FormulaValue(units.OHM, scaleFactors.SI_BASE),
            new FormulaValue(units.AMPERE, scaleFactors.SI_BASE),
            new FormulaValue(units.VOLT, scaleFactors.SI_BASE),
        ],
        [
            new class implements FormulaVariant {
                description = "V=I*R";
                getVariantValue = (formula: Formula, context: FormulaContext): Decimal => {
                    // V = I * R <=> [2] = [0] * [1]
                    return formula.values[0].getFormulaValue(context).times(formula.values[1].getFormulaValue(context));
                };
                getInputValuesDefinition = (): FormulaValue[] => {
                    return [this.parentFormula.values[0], this.parentFormula.values[1]];
                };
                getOutputValueDefinition = (): FormulaValue => {
                    return this.parentFormula.values[2];
                };
                getMathMl = (formula: Formula): string => {
                    return "<math><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mo>=</mo><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>*</mo><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></math>";
                }
                parentFormula = (null! as Formula);
            },
            new class implements FormulaVariant {
                description = "I=V/R";
                getVariantValue = (formula: Formula, context: FormulaContext): Decimal => {
                    // I = V / R <=> [1] = [2] / [0]
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[0].getFormulaValue(context));
                };
                getInputValuesDefinition = (): FormulaValue[] => {
                    return [this.parentFormula.values[0], this.parentFormula.values[2]];
                };
                getOutputValueDefinition = (): FormulaValue => {
                    return this.parentFormula.values[1];
                };
                getMathMl = (formula: Formula): string => {
                    return "<math><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi></mfrac></math>";
                };
                parentFormula = (null! as Formula);
            },
            new class implements FormulaVariant {
                description = "R=V/I";
                getVariantValue = (formula: Formula, context: FormulaContext): Decimal => {
                    // R = V / I <=> [0] = [2] / [1]
                    return formula.values[2].getFormulaValue(context).dividedBy(formula.values[1].getFormulaValue(context));
                };
                getInputValuesDefinition = (): FormulaValue[] => {
                    return [this.parentFormula.values[2], this.parentFormula.values[1]];
                };
                getOutputValueDefinition = (): FormulaValue => {
                    return this.parentFormula.values[0];
                };
                getMathMl = (formula: Formula): string => {
                    return "<math><mi>" +
                        formula.values[0].unit.symbol +
                        "</mi><mo>=</mo><mfrac><mi>" +
                        formula.values[2].unit.symbol +
                        "</mi><mi>" +
                        formula.values[1].unit.symbol +
                        "</mi></mfrac></math>";
                };
                parentFormula = (null! as Formula);
            },
        ],
        "ohm_law",
        ["electricity"],
        new URL("https://wikipedia.org/wiki/Ohm's_law")
    ),
}
// Fixing the "parentFormula" property in every formula variant.
Object.keys(formulas).forEach(formulaKey => {
    formulas[formulaKey].variants.forEach(formulaVariant => {
        formulaVariant.parentFormula = formulas[formulaKey];
    });
});


// ---------------------
//  Context Extra Stuff
// ---------------------

class ContextType {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

const contextTypes: { [key: string]: ContextType } = {
    DISABLED: new ContextType(localize("context.type.disabled.name"), localize("context.type.disabled.desc")),
    CONSTANT: new ContextType(localize("context.type.constant.name"), localize("context.type.constant.desc")),
    CONTINUOUS: new ContextType(localize("context.type.continuous.name"), localize("context.type.continuous.desc")),
    VALUE_RANGE: new ContextType(localize("context.type.valueRange.name"), localize("context.type.valueRange.desc")),
    DATASET_RANG: new ContextType(localize("context.type.dataSetRange.name"), localize("context.type.dataSetRange.desc")),
}


// -----------
//  Data Sets
// -----------
console.debug("Preparing sets...");

class DataSet {
    name: string;
    description: string;

    protected values: Decimal[];
    unit: Unit;
    scaleFactor: UnitScaleFactor;

    constructor(name: string, description: string, values: Decimal[], unit: Unit, scaleFactor: UnitScaleFactor) {
        this.name = name;
        this.description = description;
        this.values = values;
        this.unit = unit;
        this.scaleFactor = scaleFactor;

        if(unit.scale != scaleFactor.scale) {
            alert("");
            throw Error("");
        }
    }

    getDataSet(): Decimal[] {
        return this.values;
    }
}

// This "technically" worked, but the values we """slightly""" off...
/*class ResistorIecDataSet extends DataSet {
    private stepCount: number;

    constructor(name: string, description: string, stepCount: number) {
        super(name, description, [], units.OHM, scaleFactors.SI_BASE);
        this.stepCount = stepCount;

        // Calculating the values according to "IEC 60063:1963".
        // See: https://eepower.com/resistor-guide/resistor-standards-and-codes/resistor-values/
        for(let iLogMult = -1; iLogMult < 2; iLogMult++) {
            for(let iStep = 1; iStep < this.stepCount; iStep++) {
                this.values.push(
                    (new Decimal(10).pow(iLogMult)).pow(new Decimal(iStep).dividedBy(stepCount))
                )
            }
        }
    }
}*/

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

//https://electronicsplanet.ch/en/resistor/e192-series.php
//TODO: E96, E192

// https://electronicsplanet.ch/en/resistor/e12-series.php
const resistorsScales = [1, 10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000];
// https://www.rfcafe.com/references/electrical/capacitor-values.htm
const capacitorScales = [10e-12, 10e-11, 10e-10, 10e-9, 10e-8, 10e-7, 10e-6, 10e-5, 10e-4, 10e-3, 10e-2];

const sets: { [key: string]: DataSet } = {
    RESISTOR_E3: new DataSet(
        localize("dataset.resistor-e3.name"),
        localize("dataset.resistor-e3.desc"),
        resistorsScales.flatMap((e3Scale) => e3Range.map(
            (e3Multiplier) => new Decimal(e3Scale).times(e3Multiplier)
        )),
        units.OHM,
        scaleFactors.SI_BASE,
    ),
    RESISTOR_E6: new DataSet(
    localize("dataset.resistor-e6.name"),
        localize("dataset.resistor-e6.desc"),
        resistorsScales.flatMap((e6Scale) => e6Range.map(
            (e6Multiplier) => new Decimal(e6Scale).times(e6Multiplier)
        )),
        units.OHM,
        scaleFactors.SI_BASE,
    ),
    RESISTOR_E12: new DataSet(
        localize("dataset.resistor-e12.name"),
        localize("dataset.resistor-e12.desc"),
        resistorsScales.flatMap((e12Scale) => e12Range.map(
            (e12Multiplier) => new Decimal(e12Scale).times(e12Multiplier)
        )),
        units.OHM,
        scaleFactors.SI_BASE,
    ),
    RESISTOR_E24: new DataSet(
        localize("dataset.resistor-e24.name"),
        localize("dataset.resistor-e24.desc"),
        resistorsScales.flatMap((e24Scale) => e24Range.map(
            (e24Multiplier) => new Decimal(e24Scale).times(e24Multiplier)
        )),
        units.OHM,
        scaleFactors.SI_BASE,
    ),
    RESISTOR_E48: new DataSet(
        localize("dataset.resistor-e48.name"),
        localize("dataset.resistor-e48.desc"),
        resistorsScales.flatMap((e48Scale) => e48Range.map(
            (e48Multiplier) => new Decimal(e48Scale).times(e48Multiplier)
        )),
        units.OHM,
        scaleFactors.SI_BASE,
    ),
    CAPACITOR_IEC: new DataSet(
        localize("dataset.capacitor-iec.name"),
        localize("dataset.capacitor-iec.desc"),
        capacitorScales.flatMap((cScale) => e24Range.map(
            (eMultiplier) => new Decimal(cScale).times(eMultiplier)
        )),
        units.FARAD,
        scaleFactors.SI_BASE,
    ),
};


// ----------------
//  User Interface
// ----------------
console.debug("Preparing UI...");


// ---------------------------
//  User Interface > Formulas
// ---------------------------

// ---------------------------------------
//  User Interface > Formulas > Workbench
// ---------------------------------------
const idWorkbenchFormulaPrefix = "fw-workbench-formula-";
const idWorkbenchFormulaSpawnPoint = idWorkbenchFormulaPrefix + "spawn";

// Formula template
const idTemplateFormula = "template-workbench-formula";
const idFormulaName = idWorkbenchFormulaPrefix + "name";
const idFormulaInputs = idWorkbenchFormulaPrefix + "inputs";
const idFormulaOutputs = idWorkbenchFormulaPrefix + "outputs";

// FormulaUnit template
const classTemplateFormulaValue = "formula-value-input-form";
const idTemplateFormulaValue = idTemplateFormula + "-value";
const idFormulaValuePrefix = idWorkbenchFormulaPrefix + "value-";
const idFormulaValueId = idFormulaValuePrefix + "id";
const idFormulaValueName = idFormulaValuePrefix + "name";
const idFormulaValueLink = idFormulaValuePrefix + "link";
const idFormulaValueTestValue = idFormulaValuePrefix + "test-value";
const idFormulaValueTestScale = idFormulaValuePrefix + "test-scale";
const idFormulaValueTestValueSet = idFormulaValuePrefix + "test-value-set";

// Grabbing the templates
let eTemplateWorkbenchFormula: HTMLElement | DocumentFragment | null = document.getElementById(idTemplateFormula);
let eTemplateWorkbenchFormulaValue: HTMLElement | DocumentFragment | null = document.getElementById(idTemplateFormulaValue);
if(eTemplateWorkbenchFormula === null || eTemplateWorkbenchFormulaValue === null) {
    alert("error.ui.workbench.noTemplate");
    throw Error("error.ui.workbench.noTemplate");
}
eTemplateWorkbenchFormula = (eTemplateWorkbenchFormula.cloneNode(true) as HTMLTemplateElement).content;
eTemplateWorkbenchFormulaValue = (eTemplateWorkbenchFormulaValue.cloneNode(true) as HTMLTemplateElement).content;

// Grabbing the anchor point
const eWorkbenchFormulaSpawnPoint: HTMLAnchorElement | null = document.querySelector(`a#${idWorkbenchFormulaSpawnPoint}`);
if(eWorkbenchFormulaSpawnPoint === null) {
    alert("error.ui.workbench.noAnchor");
    throw Error("error.ui.workbench.noAnchor");
}


// Other BS
let uiWorkbenchFormulas: WorkbenchFormulaUiElement[] = [];

enum WorkbenchFormulaValueTypes {
    //UNKNOWN,
    INPUT,
    OUTPUT,
}

class WorkbenchFormulaValueUiElement {
    public rootElement: HTMLElement;

    private idSuffix: string;

    private formulaValue: FormulaValue;

    private parentFormulaElement: WorkbenchFormulaUiElement;

    private eFormulaValueId: HTMLInputElement;
    private eFormulaValueName: HTMLParagraphElement;
    private eFormulaValueLink: HTMLSelectElement;
    private eFormulaValueTestValue: HTMLInputElement;
    private eFormulaValueTestScale: HTMLSelectElement;
    private eFormulaValueTestValueSet: HTMLInputElement;

    private valueType: WorkbenchFormulaValueTypes;

    constructor(rootElement: HTMLElement, formulaValue: FormulaValue, parentFormulaElement: WorkbenchFormulaUiElement,
                valueType: WorkbenchFormulaValueTypes) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString() + Math.floor(Math.random() * 99);

        this.valueType = valueType;

        this.formulaValue = formulaValue;
        this.parentFormulaElement = parentFormulaElement;

        // All "null" checks are done below.
        this.eFormulaValueId = rootElement.querySelector(`input#${idFormulaValueId}`)!;
        this.eFormulaValueName = rootElement.querySelector(`p#${idFormulaValueName}`)!;
        this.eFormulaValueLink = rootElement.querySelector(`select#${idFormulaValueLink}`)!;
        this.eFormulaValueTestValue = rootElement.querySelector(`input#${idFormulaValueTestValue}`)!;
        this.eFormulaValueTestScale = rootElement.querySelector(`select#${idFormulaValueTestScale}`)!;
        this.eFormulaValueTestValueSet = rootElement.querySelector(`select#${idFormulaValueTestValueSet}`)!;

        if([this.eFormulaValueId, this.eFormulaValueName, this.eFormulaValueLink, this.eFormulaValueTestValue,
            this.eFormulaValueTestScale, this.eFormulaValueTestValueSet].some((item) => item === null)) {
            alert("error.ui.formula.value.missingElement");
            throw Error("error.ui.formula.value.missingElement");
        }

        // Hiding the testing value set row since it isn't implemented yet.
        // This should be used for stuff like wire gauge to get fixed sets like 8,6,4,5.
        // Note: It might actually be redundant...
        this.toggleField(this.eFormulaValueTestValueSet, true);

        // Changing IDs as needed.
        this.rootElement.querySelectorAll(`input, select, p, div`).forEach(eFormInput => {
            if(eFormInput.hasAttribute("id")) {
                eFormInput.setAttribute("id", eFormInput.getAttribute("id") + this.idSuffix);
            }
        });
        this.rootElement.querySelectorAll(`label`).forEach(eFormLabel => {
            if(eFormLabel.hasAttribute("for")) {
                eFormLabel.setAttribute("for", eFormLabel.getAttribute("for") + this.idSuffix);
            }
        });

        // Setting some fields' default value.
        this.eFormulaValueName.innerText = `${this.formulaValue.unit.name} (${this.formulaValue.unit.symbol})`;
        this.eFormulaValueId.value = this.idSuffix;

        // Adding the relevant scale factors.
        populateScaleSelectForUnit(this.formulaValue.unit, this.eFormulaValueTestScale, this.formulaValue.scaleFactor);

        if(this.valueType === WorkbenchFormulaValueTypes.INPUT) {
            this.setupInput();
        } else {
            this.setupOutput();
        }
    }

    private onTestFieldChange(event: Event | null) {
        // NOTE: As it stands, it could be replaced by a direct bind to the parent's function :/
        this.parentFormulaElement.calculateTestValues();
    }

    public getTestValue(): Decimal {
        return new Decimal(
            isStringValidNumber(this.eFormulaValueTestValue.value) ? this.eFormulaValueTestValue.value : 0
        );
    }

    public setTestValue(newValue: Decimal) {
        this.eFormulaValueTestValue.value = newValue.toString();
    }

    toggleTestMode(hidden: boolean) {
        // We hide the parent "tr" elements.
        (this.eFormulaValueTestScale.parentNode!.parentNode! as HTMLElement).hidden = hidden;
        (this.eFormulaValueTestScale.parentNode!.parentNode! as HTMLElement).hidden = hidden;
    }

    toggleField(eFormField: HTMLElement, hidden: boolean) {
        // We hide the parent "tr" element.
        (eFormField.parentNode!.parentNode! as HTMLElement).hidden = hidden;
    }

    private setupInput() {
        this.toggleField(this.eFormulaValueId, true);
        this.eFormulaValueTestValue.value = "0";
        this.eFormulaValueTestValue.onchange = this.onTestFieldChange.bind(this);
        this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }

    private setupOutput() {
        this.toggleField(this.eFormulaValueLink, true);
        this.eFormulaValueTestValue.readOnly = true;
        this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }

    public static getNew(formulaValue: FormulaValue, parentFormulaElement: WorkbenchFormulaUiElement,
                          valueType: WorkbenchFormulaValueTypes): WorkbenchFormulaValueUiElement {
        // Grabbing the actual HTMLElement from the document fragment.
        const eNewWorkbenchFormulaValue=
            (eTemplateWorkbenchFormulaValue!.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
        if(eNewWorkbenchFormulaValue === null) {
            alert("error.ui.workbench.formula.value.cannotGetElement");
            throw Error("error.ui.workbench.formula.value.cannotGetElement");
        }

        return new WorkbenchFormulaValueUiElement(eNewWorkbenchFormulaValue, formulaValue, parentFormulaElement, valueType);
    }
}

class WorkbenchFormulaUiElement {
    public rootElement: HTMLElement;

    private idSuffix: string;

    private formulaVariant: FormulaVariant;

    private eFormulaName: HTMLParagraphElement;
    private eFormulaInputs: HTMLDivElement;
    private eFormulaOutputs: HTMLDivElement;

    private inputValueElements: WorkbenchFormulaValueUiElement[];
    private outputValueElements: WorkbenchFormulaValueUiElement[];

    constructor(rootElement: HTMLElement, formulaVariant: FormulaVariant) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString();

        this.formulaVariant = formulaVariant;

        // All "null" checks are done below.
        this.eFormulaName = rootElement.querySelector(`p#${idFormulaName}`)!;
        this.eFormulaInputs = rootElement.querySelector(`div#${idFormulaInputs}`)!;
        this.eFormulaOutputs = rootElement.querySelector(`div#${idFormulaOutputs}`)!;

        if([this.eFormulaName, this.eFormulaInputs, this.eFormulaOutputs].some((item) => item === null)) {
            alert("error.ui.formula.missingElement");
            throw Error("error.ui.formula.missingElement");
        }

        // Setting up the name.
        this.eFormulaName.innerText = this.formulaVariant.parentFormula.name;

        // Adding the inputs and outputs.
        this.inputValueElements = [];
        this.formulaVariant.getInputValuesDefinition().forEach(variantValue => {
            const newInputValueElement = WorkbenchFormulaValueUiElement.getNew(
                variantValue, this, WorkbenchFormulaValueTypes.INPUT
            );
            this.inputValueElements.push(newInputValueElement);
            this.eFormulaInputs.appendChild(newInputValueElement.rootElement);
        });
        this.outputValueElements = [];
        [this.formulaVariant.getOutputValueDefinition()].forEach(variantValue => {
            const newOutputValueElement = WorkbenchFormulaValueUiElement.getNew(
                variantValue, this, WorkbenchFormulaValueTypes.OUTPUT
            );
            this.outputValueElements.push(newOutputValueElement);
            this.eFormulaOutputs.appendChild(newOutputValueElement.rootElement);
        });
    }

    toggleTestMode(hidden: boolean) {
        // TODO
    }

    calculateTestValues() {
        console.log("Handling change...");
    }

    public static createNew(formulaVariant: FormulaVariant): WorkbenchFormulaUiElement {
        // Grabbing the actual HTMLElement from the document fragment.
        const eNewWorkbenchFormula=
            (eTemplateWorkbenchFormula!.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
        if(eNewWorkbenchFormula === null) {
            alert("error.ui.workbench.formula.cannotGetElement");
            throw Error("error.ui.workbench.formula.cannotGetElement");
        }

        const newWorkbenchUiElement = new WorkbenchFormulaUiElement(eNewWorkbenchFormula, formulaVariant);
        uiWorkbenchFormulas.push(newWorkbenchUiElement);
        eWorkbenchFormulaSpawnPoint!.parentNode!.insertBefore(newWorkbenchUiElement.rootElement, eWorkbenchFormulaSpawnPoint);
        return newWorkbenchUiElement;
    }
}


// -------------------------------------
//  User Interface > Formulas > Catalog
// -------------------------------------
const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-"
const idCatalogCategoryCount = idCatalogPrefix + "formula-count"

// We grab all the categories and put them in a map.
// The key is their ID without the prefix.  (Result: electricity, chemistry, ...)
const eCategoryContainers: { [key: string]: HTMLElement } = {};
document.querySelectorAll('[id]').forEach((element ) => {
    if(element.id.startsWith(idCatalogCategoryPrefix)) {
        eCategoryContainers[element.id.replace(idCatalogCategoryPrefix, "")] = element as HTMLElement;
    }
});

// Showing the formula count.
const eFormulaCount = document.getElementById(idCatalogCategoryCount);
if(eFormulaCount !== null) {
    //eFormulaCount.innerText = Object.keys(formulas).length + " "+ localize("ui.formulaCount");
    eFormulaCount.innerText = Object.keys(formulas).length.toString();
}

// Grabbing the templates for formulas and their variants
let eTemplateFormula = document.getElementById("template-formula-available");
let eTemplateFormulaVariant = document.getElementById("template-formula-available-variant");
if(eTemplateFormula === null || eTemplateFormulaVariant === null) {
    alert("error.ui.catalog.noTemplate");
    throw Error("error.ui.catalog.noTemplate");
}

// Adding the formulas and their variants to the page
Object.keys(formulas).forEach(formulaKey => {
    const hasValidCategory: boolean = formulas[formulaKey].categories.every(function(categoryId) {
        return Object.keys(eCategoryContainers).indexOf(categoryId) !== -1;
    });
    if(hasValidCategory) {
        // Preparing the common element for the formula
        let eNewFormula = (eTemplateFormula as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

        let eNewFormulaTitle = eNewFormula.querySelector("p");
        if(eNewFormulaTitle !== null) {
            //eNewFormulaTitle.innerText = localize(formulas[formulaKey].name);
            eNewFormulaTitle.innerText = formulas[formulaKey].name;
        }

        let eNewFormulaVariants = eNewFormula.querySelector("div.fw-variants");
        if(eNewFormulaVariants === null) {
            alert("");
            throw Error("");
        }
        eNewFormulaVariants.innerHTML = "";

        formulas[formulaKey].variants.forEach(variant => {
            let eNewFormulaVariant = (eTemplateFormulaVariant as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
            let eNewFormulaVariantButton = eNewFormulaVariant.querySelector("button");
            if(eNewFormulaVariantButton === null) {
                alert("");
                throw Error("");
            }
            eNewFormulaVariantButton.innerHTML = variant.getMathMl(formulas[formulaKey]);
            eNewFormulaVariantButton.title = variant.description;

            eNewFormulaVariantButton.onclick = function() {
                WorkbenchFormulaUiElement.createNew(variant);
            };

            // @ts-ignore - "eNewFormulaVariants" cannot be null here !
            eNewFormulaVariants.appendChild(eNewFormulaVariant);
        });

        // Adding it to any relevant category.
        formulas[formulaKey].categories.forEach(categoryKey => {
            if(Object.keys(eCategoryContainers).includes(categoryKey)) {
                // @ts-ignore - "eCategoryContainers[categoryKey]" cannot be null !
                eCategoryContainers[categoryKey].appendChild(eNewFormula);
            }
        });
    }
});


// -------------------------------------
//  User Interface > Context Components
// -------------------------------------
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

let uiContextComponents: ContextComponentUiElement[] = [];

// Preparing the context component template.
// We Mainly populate the option inputs and whatnot for future clones.

// fw-text-context-middle
let eTemplateContextComponent: HTMLElement | DocumentFragment | null = document.getElementById("template-context-component");
if(eTemplateContextComponent === null) {
    alert("error.ui.context.noTemplate");
    throw Error("error.ui.context.noTemplate");
}
eTemplateContextComponent = (eTemplateContextComponent.cloneNode(true) as HTMLTemplateElement).content;
const eContextTypes = eTemplateContextComponent.getElementById(idContextComponentTypes);
const eContextSets = eTemplateContextComponent.getElementById(idContextComponentSets);
const eContextUnits = eTemplateContextComponent.getElementById(idContextComponentUnit);
const eContextScales = eTemplateContextComponent.getElementById(idContextComponentScale);
if([eContextTypes, eContextSets, eContextUnits, eContextScales].some((item) => item === null)) {
    alert("error.ui.context.noSets");
    throw Error("error.ui.context.noSets");
}
Object.keys(contextTypes).forEach(value => {
    const eNewContextTypesOption = document.createElement("option");
    eNewContextTypesOption.setAttribute("value", value);
    eNewContextTypesOption.innerText = contextTypes[value].name;
    eContextTypes!.appendChild(eNewContextTypesOption);
});
Object.keys(sets).forEach(value => {
    const eNewContextSetsOption = document.createElement("option");
    eNewContextSetsOption.setAttribute("value", value);
    eNewContextSetsOption.innerText = sets[value].name;
    eContextSets!.appendChild(eNewContextSetsOption);
});
Object.keys(units).forEach(unitKey => {
    const eNewContextUnitsOption = document.createElement("option");
    eNewContextUnitsOption.setAttribute("value", unitKey);
    eNewContextUnitsOption.innerText = units[unitKey].name;
    eContextUnits!.appendChild(eNewContextUnitsOption);
});
Object.keys(scaleFactors).forEach(scaleKey => {
    const eNewContextScalesOption = document.createElement("option");
    eNewContextScalesOption.setAttribute("value", scaleKey);
    eNewContextScalesOption.innerText = scaleFactors[scaleKey].prefix;
    eContextScales!.appendChild(eNewContextScalesOption);
});

// Preparing the context components status message.
// This element is used as an "anchoring point" for new context components since it should sit between
//  them and the buttons.
let eContextStatusMessage = document.getElementById("fw-text-context-middle");
if(eContextStatusMessage === null) {
    alert("error.ui.context.noStatus");
    throw Error("error.ui.context.noStatus");
}

// Preparing the context components buttons.
// Those are simply used to add and debug context components.
let eContextAddButton: HTMLButtonElement | null = document.querySelector("button#fw-button-add-context");
if(eContextAddButton === null) {
    alert("error.ui.context.missingButton");
    throw Error("error.ui.context.missingButton");
}

// Defining a chimera-esque "MVC" for the context components.
// I couldn't be bothered to make a proper MVC thingy.
// If you see this and feel the need to screech, please send your written complaints to "/dev/null".
class ContextComponentUiElement {
    public rootElement: HTMLElement;

    private readonly idSuffix: string;

    private readonly eIdLabel: HTMLLabelElement;
    private readonly eIdInput: HTMLInputElement;
    private readonly eDeleteButton: HTMLButtonElement;
    private readonly eTypeLabel: HTMLLabelElement;
    private readonly eTypeSelect: HTMLSelectElement;

    private readonly eManualValueLabel: HTMLLabelElement;
    private readonly eManualValueInput: HTMLInputElement;

    private readonly eManualValuesLabel: HTMLLabelElement;
    private readonly eManualValuesInput: HTMLInputElement;

    private readonly eRangeFromLabel: HTMLLabelElement;
    private readonly eRangeFromInput: HTMLInputElement;
    private readonly eRangeToLabel: HTMLLabelElement;
    private readonly eRangeToInput: HTMLInputElement;
    private readonly eRangeStepLabel: HTMLLabelElement;
    private readonly eRangeStepInput: HTMLInputElement;

    private readonly eDataSetLabel: HTMLLabelElement;
    private readonly eDataSetSelect: HTMLSelectElement;

    private readonly eUnitLabel: HTMLLabelElement;
    private readonly eUnitSelect: HTMLSelectElement;
    private readonly eScaleLabel: HTMLLabelElement;
    private readonly eScaleSelect: HTMLSelectElement;

    private readonly allElements: HTMLElement[];

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.idSuffix = Date.now().toString();

        // All "null" checks are done below.
        this.eIdLabel = rootElement.querySelector(`label[for="${idContextComponentId}"]`)!;
        this.eIdInput = rootElement.querySelector(`input#${idContextComponentId}`)!;

        this.eDeleteButton = rootElement.querySelector(`button#${idContextComponentDelete}`)!;

        this.eTypeLabel = rootElement.querySelector(`label[for="${idContextComponentTypes}"]`)!;
        this.eTypeSelect = rootElement.querySelector(`select#${idContextComponentTypes}`)!;

        this.eManualValueLabel = rootElement.querySelector(`label[for="${idContextComponentManualValue}"]`)!;
        this.eManualValueInput = rootElement.querySelector(`input#${idContextComponentManualValue}`)!;

        this.eManualValuesLabel = rootElement.querySelector(`label[for="${idContextComponentManualValues}"]`)!;
        this.eManualValuesInput = rootElement.querySelector(`input#${idContextComponentManualValues}`)!;

        this.eRangeFromLabel = rootElement.querySelector(`label[for="${idContextComponentRangeFrom}"]`)!;
        this.eRangeFromInput = rootElement.querySelector(`input#${idContextComponentRangeFrom}`)!;
        this.eRangeToLabel = rootElement.querySelector(`label[for="${idContextComponentRangeTo}"]`)!;
        this.eRangeToInput = rootElement.querySelector(`input#${idContextComponentRangeTo}`)!;
        this.eRangeStepLabel = rootElement.querySelector(`label[for="${idContextComponentRangeStep}"]`)!;
        this.eRangeStepInput = rootElement.querySelector(`input#${idContextComponentRangeStep}`)!;

        this.eDataSetLabel = rootElement.querySelector(`label[for="${idContextComponentSets}"]`)!;
        this.eDataSetSelect = rootElement.querySelector(`select#${idContextComponentSets}`)!;

        this.eUnitLabel = rootElement.querySelector(`label[for="${idContextComponentUnit}"]`)!;
        this.eUnitSelect = rootElement.querySelector(`select#${idContextComponentUnit}`)!;
        this.eScaleLabel = rootElement.querySelector(`label[for="${idContextComponentScale}"]`)!;
        this.eScaleSelect = rootElement.querySelector(`select#${idContextComponentScale}`)!;

        // Making sure we got all elements.
        this.allElements = [
            this.eIdLabel, this.eIdInput, this.eDeleteButton, this.eTypeLabel, this.eTypeSelect,
            this.eManualValuesLabel, this.eManualValuesInput, this.eRangeFromLabel, this.eRangeFromInput,
            this.eRangeToLabel, this.eRangeToInput, this.eRangeStepLabel, this.eRangeStepInput, this.eDataSetLabel,
            this.eDataSetSelect, this.eUnitLabel, this.eUnitSelect, this.eScaleLabel, this.eScaleSelect,
            this.eManualValueLabel, this.eManualValueInput
        ];
        if(this.allElements.some((item) => item === null)) {
            alert("error.ui.context.component.missingElement");
            throw Error("error.ui.context.component.missingElement");
        }

        // Appending the "idSuffix" to all the IDs and "for" attributes .
        rootElement.querySelectorAll(`input, select`).forEach(eFormInput => {
            if(eFormInput.hasAttribute("id")) {
                eFormInput.setAttribute("id", eFormInput.getAttribute("id") + this.idSuffix);
            }
        });
        rootElement.querySelectorAll(`label`).forEach(eFormLabel => {
            if(eFormLabel.hasAttribute("for")) {
                eFormLabel.setAttribute("for", eFormLabel.getAttribute("for") + this.idSuffix);
            }
        });

        // Other manual ID-related changes.
        this.eDeleteButton.removeAttribute('id');

        // Setting up default values in fields.
        this.eIdInput.value = this.idSuffix;

        // Setting actions & events.
        this.eTypeSelect.onchange = this.onTypeChange.bind(this);
        this.eDeleteButton.onclick = this.onDeleteClick.bind(this);

        // Forcing some actions
        this.onTypeChange(null);
    }

    onTypeChange(event: Event | null) {
        // Hiding all elements.
        this.allElements.forEach(eFormElement => {
           this.toggleField(eFormElement, true);
        });

        // Showing elements that are available for all types.
        this.toggleField(this.eIdLabel, false);  // Id (Label + input) & Delete button
        this.toggleField(this.eTypeLabel, false);  // Type (Label + select)

        if(this.getContextType() !== contextTypes.DISABLED) {
            this.toggleField(this.eUnitLabel, false);  // Unit (Label + select)
            this.toggleField(this.eScaleLabel, false);  // Scale (Label + select)
        }

        // Showing relevant elements.
        // The "DISABLED" and default ones show nothing more.
        switch(this.getContextType()) {
            case contextTypes.CONSTANT:
                this.toggleField(this.eManualValueInput, false);  // Value (Label + select)
                break;
            case contextTypes.CONTINUOUS:
                this.toggleField(this.eRangeFromLabel, false);  // From (Label + select)
                this.toggleField(this.eRangeToLabel, false);  // To (Label + select)
                this.toggleField(this.eRangeStepLabel, false);  // Step (Label + select)
                break;
            case contextTypes.VALUE_RANGE:
                this.toggleField(this.eManualValuesInput, false);  // Values (Label + select)
                break;
            case contextTypes.DATASET_RANG:
                this.toggleField(this.eDataSetLabel, false);  // Set (Label + select)
                break;
        }
    }

    onDeleteClick(event: Event) {
        this.rootElement.remove();
        uiContextComponents = uiContextComponents.filter(item => item !== this);
        if(uiContextComponents.length < 1) {
            eContextStatusMessage!.hidden = false;
        }
    }

    toggleField(eFormField: HTMLElement, hidden: boolean) {
        // We hide the parent "tr" element.
        (eFormField.parentNode!.parentNode! as HTMLElement).hidden = hidden;
    }

    getContextType(): ContextType {
        // This shouldn't return "null" since the select has its values derived from the object's keys.
        return contextTypes[this.eTypeSelect.value];
    }
}

eContextAddButton.onclick = function() {
    // We only get the fragment via the template, we have to use this monstrosity to get a proper element out of it.
    const eNewContextComponent=
        (eTemplateContextComponent!.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
    if(eNewContextComponent === null) {
        alert("error.ui.context.component.cannotGetElement");
        throw Error("error.ui.context.component.cannotGetElement");
    }

    const newContextComponent = new ContextComponentUiElement(eNewContextComponent);
    uiContextComponents.push(newContextComponent);

    eContextStatusMessage!.parentNode!.insertBefore(newContextComponent.rootElement, eContextStatusMessage);
    eContextStatusMessage!.hidden = true;
}

// --------------------------------
//  User Interface > Super Helpers
// --------------------------------

function getRee() {

}


// -----------------------------------------------------------------------------------------------------------------
//  The "Nobody could give me a synonym for a math nerd/number cruncher to serve as a pun" mechanism.
// -----------------------------------------------------------------------------------------------------------------
//  You can all go eat a bag of dicks with your
//    "muh, I cAn'T GiVE yoU AnYtHinG That remOtEly rEsEmBlEs a PejOraTiVE Term, eveN In A friEndLY/jOkey cONteXT".
//  I'll just call it the "NumberProlapsingMachine" then...
//  Fuck you all and your tumblr-esque PC brain-rot.
// -----------------------------------------------------------------------------------------------------------------

class NumberProlapsingMachine {

}

// -----------
//  Debugging
// -----------

if(new URLSearchParams(window.location.search).has("debug")) {
    console.debug("Preparing debugging tools...");

    let eDebugContainer: HTMLDivElement | null = document.querySelector("div#fw-debug-root");
    let eDebugLinkAndIdsButton: HTMLButtonElement | null = document.querySelector("button#fw-button-debug-linkAndIds");
    if(eDebugContainer === null || eDebugLinkAndIdsButton === null) {
        alert("error.ui.context.missingButton");
        throw Error("error.ui.context.missingButton");
    }
    eDebugContainer.hidden = false;
    eDebugLinkAndIdsButton.onclick = function() {
        alert(JSON.stringify({'a': 1, 'b': 3}, null, 4));
    };
}

// --------------
//  End of setup
// --------------
// We're done and ready to stretch some numbers :)
const endTime = new Date().getMilliseconds();
console.log("Done, took " + (endTime - startTime) + "ms !");

//const eTestOutput = document.getElementById("formula-wizard.test");
//if(eTestOutput !== null) {
//    eTestOutput.innerHTML = formulas.OHM_LAW.variants[2].getMathMl(formulas.OHM_LAW);
//}

// Debug logging
//console.log(scales);
//console.log(scaleFactors);
//console.log(units);
//console.log(formulas);
//console.log("---------");

//let testContext = [
//    new Decimal(5),  // 5V
//    new Decimal(3),  // 3A
//];

// R = V / I <=> [0] = [2] / [1]
//let testFormula = formulas.OHM_LAW.getClone();
//let testVariant = testFormula.variants[2];
//
//let graphVolt= new FormulaContextHandler(0);
//let graphAmp= new FormulaContextHandler(1);
//
//testFormula.values[2].valueSource = graphVolt;
//testFormula.values[1].valueSource = graphAmp;

//for(let i= 1; i < 10; i++) {
//    testContext[0] = new Decimal(i);
//    console.log(testVariant.getVariantValue(testFormula, testContext).toString());
//}

// It works ! :D

// We have a proper clone :)
//console.log(formulas.OHM_LAW.values[0].scaleFactor);
//console.log(testFormula.values[0].scaleFactor);
//testFormula.values[0].scaleFactor = scaleFactors.SI_MILLI;
//console.log(formulas.OHM_LAW.values[0].scaleFactor);
//console.log(testFormula.values[0].scaleFactor);
