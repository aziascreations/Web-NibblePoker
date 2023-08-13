import { Decimal } from "../../../../resources/DecimalJs/10.4.3/decimal.min.mjs";
import { localize } from "./lang.js";
import { units, scaleFactors } from "./units.js";
export class DataSet {
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
export const sets = {
    RESISTOR_E3: new DataSet(localize("dataset.resistor-e3.name"), localize("dataset.resistor-e3.desc"), resistorsScales.flatMap((e3Scale) => e3Range.map((e3Multiplier) => new Decimal(e3Scale).times(e3Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E6: new DataSet(localize("dataset.resistor-e6.name"), localize("dataset.resistor-e6.desc"), resistorsScales.flatMap((e6Scale) => e6Range.map((e6Multiplier) => new Decimal(e6Scale).times(e6Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E12: new DataSet(localize("dataset.resistor-e12.name"), localize("dataset.resistor-e12.desc"), resistorsScales.flatMap((e12Scale) => e12Range.map((e12Multiplier) => new Decimal(e12Scale).times(e12Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E24: new DataSet(localize("dataset.resistor-e24.name"), localize("dataset.resistor-e24.desc"), resistorsScales.flatMap((e24Scale) => e24Range.map((e24Multiplier) => new Decimal(e24Scale).times(e24Multiplier))), units.OHM, scaleFactors.SI_BASE),
    RESISTOR_E48: new DataSet(localize("dataset.resistor-e48.name"), localize("dataset.resistor-e48.desc"), resistorsScales.flatMap((e48Scale) => e48Range.map((e48Multiplier) => new Decimal(e48Scale).times(e48Multiplier))), units.OHM, scaleFactors.SI_BASE),
    CAPACITOR_IEC: new DataSet(localize("dataset.capacitor-iec.name"), localize("dataset.capacitor-iec.desc"), capacitorScales.flatMap((cScale) => e24Range.map((eMultiplier) => new Decimal(cScale).times(eMultiplier))), units.FARAD, scaleFactors.SI_BASE),
};
//# sourceMappingURL=sets.js.map