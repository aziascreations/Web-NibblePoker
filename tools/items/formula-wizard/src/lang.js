export const langKey = document.documentElement.lang.match("(en|fr)") ? document.documentElement.lang : "en";
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
export function localize(stringKey) {
    let _langData = langKey in langData ? langData[langKey] : langData.en;
    return stringKey in _langData ? _langData[stringKey] : (stringKey in langData["en"] ? langData["en"][stringKey] : stringKey);
}
//# sourceMappingURL=lang.js.map