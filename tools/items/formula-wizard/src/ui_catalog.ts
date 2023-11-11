/*
 *  Formula Wizard v1.0.0 - Formula Catalog
 * --------------------------------------------------------------------------------
 *  [Short desc here]
 *  This module handles the indexation of all formulas and their elements to be
 *   show in the UI.
 * --------------------------------------------------------------------------------
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

import {formulas, Formula} from "./formulas";

const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-"
const idCatalogCategoryCount = idCatalogPrefix + "formula-count"

// We grab all the categories and put them in a map.
// The key is their ID without the prefix.  (Result: electricity, chemistry, ...)
export const eCategoryContainers: { [key: string]: HTMLElement } = {};

// ----------------
//  ???
// ----------------

export const catalogFormulas: CatalogFormula[] = [];

class CatalogFormula {
    formula: Formula;
    eFormulaContainer: HTMLElement;
    eVariantContainer: HTMLElement;
    eCategories: HTMLElement[];
    eVariantContainers: HTMLElement[];
    eVariantButtons: HTMLButtonElement[];

    constructor(formula: Formula, eCategories: HTMLElement[], eFormulaContainer: HTMLElement,
                eVariantContainers: HTMLElement[], eVariantButtons: HTMLButtonElement[]) {
        this.formula = formula;
        this.eCategories = eCategories;
        this.eFormulaContainer = eFormulaContainer;
        this.eVariantContainers = eVariantContainers;
        this.eVariantButtons = eVariantButtons;

        // Setting up the title
        let eNewFormulaTitle = this.eFormulaContainer.querySelector("p");
        if(eNewFormulaTitle !== null) {
            eNewFormulaTitle.innerText = this.formula.name;
        }

        // Grabbing the spawn point for all variants
        let eNewFormulaVariants = this.eFormulaContainer.querySelector("div.fw-variants");
        if(eNewFormulaVariants === null) {
            alert("idk1");
            throw Error("idk1");
        }
        this.eVariantContainer = eNewFormulaVariants as HTMLElement;
        this.eVariantContainer.innerHTML = "";

        // Setting up each variant
        for(let i = 0; i < this.formula.variants.length; i++) {
            this.eVariantButtons[i].innerHTML = this.formula.variants[i].getMathMl(this.formula);
            this.eVariantButtons[i].title = this.formula.variants[i].description;

            // Now adding those buttons to the root element.
            this.eVariantContainer.appendChild(this.eVariantContainers[i]);
        }

        // NOTE: The "onclick" will be set in "mvc_formula.ts" since it will bind those button and the workbench
        //   formulas these buttons can spawn.
    }

    insertIntoCategories() {
        // Adding it to any relevant category.
        this.eCategories.forEach(eCategory => {
            eCategory.appendChild(this.eFormulaContainer);
        });

        // Preventing any double-insertion.
        this.eCategories = [];
    }

    // TODO: A function to easily bind a common given function.
}


// ----------------
//  ???
// ----------------

let IsCatalogInitialized = false;

/**
 * Used by the Workbench's Formula MVC to determine if the actions on the buttons can be prepared.
 *
 * Will always return `true` once `initCatalog()` has been called at least once.
 */
export function isCatalogInitialized(): boolean {
    return IsCatalogInitialized;
}

export function initCatalog() {
    if (!IsCatalogInitialized) {
        console.group("Preparing the formula catalog...");

        console.debug("Grabbing the category container elements...");
        document.querySelectorAll('[id]').forEach((element ) => {
            if(element.id.startsWith(idCatalogCategoryPrefix)) {
                eCategoryContainers[element.id.replace(idCatalogCategoryPrefix, "")] = element as HTMLElement;
            }
        });

        console.debug("Setting up the formula count in the UI...");
        const eFormulaCount = document.getElementById(idCatalogCategoryCount);
        if(eFormulaCount !== null) {
            //eFormulaCount.innerText = Object.keys(formulas).length + " "+ localize("ui.formulaCount");
            eFormulaCount.innerText = Object.keys(formulas).length.toString();
        }

        console.debug("Grabbing the templates for formulas and their variants...");
        let eTemplateFormula = document.getElementById("template-formula-available");
        let eTemplateFormulaVariant = document.getElementById("template-formula-available-variant");
        if(eTemplateFormula === null || eTemplateFormulaVariant === null) {
            alert("error.ui.catalog.noTemplate");
            throw Error("error.ui.catalog.noTemplate");
        }

        console.debug("Preparing each formula for later use...");
        Object.keys(formulas).forEach(formulaKey => {
            // Checking if the formula has one or more matching category container element.
            const hasValidCategory: boolean = formulas[formulaKey].categories.every(function(categoryId) {
                return Object.keys(eCategoryContainers).indexOf(categoryId) !== -1;
            });

            if(hasValidCategory) {
                // Preparing the common element for the formula.
                let eNewFormula = (eTemplateFormula as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

                let eNewVariantsContainers: HTMLElement[] = [];
                let eNewVariantsButtons: HTMLButtonElement[] = [];

                formulas[formulaKey].variants.forEach(variant => {
                    let eNewFormulaVariant = (eTemplateFormulaVariant as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
                    let eNewFormulaVariantButton = eNewFormulaVariant.querySelector("button");
                    if(eNewFormulaVariantButton === null) {
                        alert("idk2");
                        throw Error("idk2");
                    }

                    eNewVariantsContainers.push(eNewFormulaVariant);
                    eNewVariantsButtons.push(eNewFormulaVariantButton);
                });

                catalogFormulas.push(
                    new CatalogFormula(
                        formulas[formulaKey],
                        formulas[formulaKey].categories
                            .filter(categoryKey => Object.keys(eCategoryContainers).includes(categoryKey))
                            .map(categoryKey => eCategoryContainers[categoryKey]),
                        eNewFormula,
                        eNewVariantsContainers,
                        eNewVariantsButtons
                    )
                );
            }
        });

        IsCatalogInitialized = true;

        console.debug(catalogFormulas);

        console.groupEnd();
    }
}
