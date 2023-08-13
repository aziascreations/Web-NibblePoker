import { localize } from "./lang.js";
import { scaleFactors, units, scaleToBase, scaleFromBase } from "./units.js";
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
export class FormulaValue {
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
export class Formula {
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
export const formulas = {
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
let areFormulasInitialized = false;
export function initFormulas() {
    if (!areFormulasInitialized) {
        console.debug("Initializing formulas...");
        Object.keys(formulas).forEach(formulaKey => {
            formulas[formulaKey].variants.forEach(formulaVariant => {
                formulaVariant.parentFormula = formulas[formulaKey];
            });
        });
        areFormulasInitialized = true;
    }
}
//# sourceMappingURL=formulas.js.map