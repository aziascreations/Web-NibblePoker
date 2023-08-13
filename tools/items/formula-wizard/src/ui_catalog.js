/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
import { formulas } from "./formulas.js";
const idCatalogPrefix = "fw-catalog-";
const idCatalogCategoryPrefix = idCatalogPrefix + "category-";
const idCatalogCategoryCount = idCatalogPrefix + "formula-count";
export const eCategoryContainers = {};
let IsCatalogInitialized = false;
export function initCatalog() {
    if (!IsCatalogInitialized) {
        console.debug("Populating formula catalog...");
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
                    eNewFormulaVariants.appendChild(eNewFormulaVariant);
                });
                formulas[formulaKey].categories.forEach(categoryKey => {
                    if (Object.keys(eCategoryContainers).includes(categoryKey)) {
                        eCategoryContainers[categoryKey].appendChild(eNewFormula);
                    }
                });
            }
        });
        IsCatalogInitialized = true;
    }
}
//# sourceMappingURL=ui_catalog.js.map