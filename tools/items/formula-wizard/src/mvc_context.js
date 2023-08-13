/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
import { localize } from "./lang.js";
import { units, scaleFactors } from "./units.js";
import { sets } from "./sets.js";
class ContextType {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
export const contextTypes = {
    DISABLED: new ContextType(localize("context.type.disabled.name"), localize("context.type.disabled.desc")),
    CONSTANT: new ContextType(localize("context.type.constant.name"), localize("context.type.constant.desc")),
    CONTINUOUS: new ContextType(localize("context.type.continuous.name"), localize("context.type.continuous.desc")),
    VALUE_RANGE: new ContextType(localize("context.type.valueRange.name"), localize("context.type.valueRange.desc")),
    DATASET_RANG: new ContextType(localize("context.type.dataSetRange.name"), localize("context.type.dataSetRange.desc")),
};
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
class WorkbenchContextComponentData {
}
class WorkbenchContextComponentInterface {
}
export class WorkbenchContextComponent {
    constructor(uiElement, data) {
        this.uiElement = uiElement;
        this.data = data;
    }
    static createNew(eRootElement) {
        return null;
    }
    toJson() {
        return JSON.stringify(this.data);
    }
    fromJson() {
        return false;
    }
}
export let workbenchContextComponents = [];
let eTemplateContextComponent = null;
let eContextStatusMessage = null;
let eContextAddButton = null;
let isWorkbenchContextSetup = false;
export function setupWorkbenchContext() {
    if (!isWorkbenchContextSetup) {
        console.debug("Preparing UI for workbench context components...");
        eTemplateContextComponent = document.getElementById("template-context-component");
        if (eTemplateContextComponent === null) {
            alert(localize("error.ui.context.noTemplate"));
            throw Error(localize("error.ui.context.noTemplate"));
        }
        eTemplateContextComponent = eTemplateContextComponent.cloneNode(true).content;
        document.getElementById("template-context-component").remove();
        const eContextTypes = eTemplateContextComponent.getElementById(idContextComponentTypes);
        const eContextSets = eTemplateContextComponent.getElementById(idContextComponentSets);
        const eContextUnits = eTemplateContextComponent.getElementById(idContextComponentUnit);
        const eContextScales = eTemplateContextComponent.getElementById(idContextComponentScale);
        if ([eContextTypes, eContextSets, eContextUnits, eContextScales].some((item) => item === null)) {
            alert(localize("error.ui.context.noSets"));
            throw Error(localize("error.ui.context.noSets"));
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
        eContextStatusMessage = document.getElementById("fw-text-context-middle");
        if (eContextStatusMessage === null) {
            alert(localize("error.ui.context.noStatus"));
            throw Error(localize("error.ui.context.noStatus"));
        }
        eContextAddButton = document.querySelector("button#fw-button-add-context");
        if (eContextAddButton === null) {
            alert(localize("error.ui.context.missingButton"));
            throw Error(localize("error.ui.context.missingButton"));
        }
        eContextAddButton.onclick = function () {
            const eNewContextComponent = eTemplateContextComponent.cloneNode(true).firstElementChild;
            if (eNewContextComponent === null) {
                alert(localize("error.ui.context.component.cannotGetElement"));
                throw Error(localize("error.ui.context.component.cannotGetElement"));
            }
            const newContextComponent = WorkbenchContextComponent.createNew(eNewContextComponent);
            workbenchContextComponents.push(newContextComponent);
        };
        isWorkbenchContextSetup = true;
    }
}
//# sourceMappingURL=mvc_context.js.map