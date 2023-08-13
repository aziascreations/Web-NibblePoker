/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

import {formulas} from "./formulas";

const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-"
const idCatalogCategoryCount = idCatalogPrefix + "formula-count"

// We grab all the categories and put them in a map.
// The key is their ID without the prefix.  (Result: electricity, chemistry, ...)
export const eCategoryContainers: { [key: string]: HTMLElement } = {};

let IsCatalogInitialized = false;

export function initCatalog() {
    if (!IsCatalogInitialized) {
        console.debug("Populating formula catalog...");

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

                    // FIXME: Add this back !
                    //eNewFormulaVariantButton.onclick = function() {
                    //    WorkbenchFormulaUiElement.createNew(variant);
                    //};

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

        IsCatalogInitialized = true;
    }
}
