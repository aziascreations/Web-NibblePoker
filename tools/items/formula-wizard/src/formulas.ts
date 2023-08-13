// ==- Basic Info -================================
//     Name: Formula Wizard - Formulas
//     File: tools/items/formula-wizard/src/formulas.ts
//  Version: N/A
//   Author: Herwin Bozet
//
// ==- Requirements -==============================
//  DecimalJS: https://github.com/MikeMcl/decimal.js/  (MIT)
//
// ==- Links & License -===========================
//  License: Unlicense
//   GitHub: https://github.com/aziascreations/Web-NibblePoker

// -----------------
//  Units > Imports
// -----------------

import {Decimal} from '../../../../resources/DecimalJs/10.4.3/decimal';

import {localize} from "./lang";
import {Unit, UnitScale, UnitScaleFactor, scaleFactors, units, scaleToBase, scaleFromBase} from "./units";

// ----------------
//  ???
// ----------------

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

export class FormulaValue {
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

export class Formula {
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

export interface FormulaVariant {
    // TODO: Use HTML5 math formula tags
    //id: string
    description: string
    getVariantValue: (formula: Formula, context: FormulaContext) => Decimal;
    getInputValuesDefinition: () => FormulaValue[];
    getOutputValueDefinition: () => FormulaValue;
    getMathMl: (formula: Formula) => string;
    parentFormula: Formula;  // Set to null when instantiating, set to proper parent right after.
}

export const formulas: { [key: string]: Formula } = {
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

// ---------------------------
//  ??? > On-Import Handler
// ---------------------------

let areFormulasInitialized = false;

export function initFormulas() {
    if (!areFormulasInitialized) {
        console.debug("Initializing formulas...");

        // Fixing the `parentFormula` property in every formula variant.
        Object.keys(formulas).forEach(formulaKey => {
            formulas[formulaKey].variants.forEach(formulaVariant => {
                formulaVariant.parentFormula = formulas[formulaKey];
            });
        });

        areFormulasInitialized = true;
    }
}
