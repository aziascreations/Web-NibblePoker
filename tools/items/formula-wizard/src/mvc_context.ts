/*
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

import {localize} from "./lang";
import {units, scaleFactors} from "./units";
import {sets} from "./sets";


// ----------------
//  ???
// ----------------

class ContextType {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export const contextTypes: { [key: string]: ContextType } = {
    DISABLED: new ContextType(localize("context.type.disabled.name"), localize("context.type.disabled.desc")),
    CONSTANT: new ContextType(localize("context.type.constant.name"), localize("context.type.constant.desc")),
    CONTINUOUS: new ContextType(localize("context.type.continuous.name"), localize("context.type.continuous.desc")),
    VALUE_RANGE: new ContextType(localize("context.type.valueRange.name"), localize("context.type.valueRange.desc")),
    DATASET_RANG: new ContextType(localize("context.type.dataSetRange.name"), localize("context.type.dataSetRange.desc")),
}


// ----------------
//  ???
// ----------------

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
    id: string;

    constructor(controllerId: string) {
        this.id = controllerId;
    }
}

class WorkbenchContextComponentInterface {
    public rootElement: HTMLElement;

    private readonly eIdLabel: HTMLLabelElement;
    private readonly eIdInput: HTMLInputElement;
    public readonly eDeleteButton: HTMLButtonElement;
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

    constructor(controllerId: string, rootElement: HTMLElement) {
        this.rootElement = rootElement;

        // Grabbing references to essential UI elements.
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
            alert(localize("error.ui.context.component.missingElement"));
            throw Error(localize("error.ui.context.component.missingElement"));
        }

        // Appending the "idSuffix" to all the IDs and "for" attributes.
        rootElement.querySelectorAll(`input, select`).forEach(eFormInput => {
            if(eFormInput.hasAttribute("id")) {
                eFormInput.setAttribute("id", eFormInput.getAttribute("id") + controllerId);
            }
        });
        rootElement.querySelectorAll(`label`).forEach(eFormLabel => {
            if(eFormLabel.hasAttribute("for")) {
                eFormLabel.setAttribute("for", eFormLabel.getAttribute("for") + controllerId);
            }
        });

        // Other manual ID-related changes.
        this.eDeleteButton.removeAttribute('id');

        // Setting up default values in fields.
        this.eIdInput.value = controllerId;
    }
}

export class WorkbenchContextComponent {
    uiElement: WorkbenchContextComponentInterface;
    data: WorkbenchContextComponentData;

    constructor(uiElement: WorkbenchContextComponentInterface, data: WorkbenchContextComponentData) {
        this.uiElement = uiElement;
        this.data = data;

        // Binding UI-sourced events to controller functions.

        // Setting actions & events.
        //this.eTypeSelect.onchange = this.onTypeChange.bind(this);
        this.uiElement.eDeleteButton.onclick = this.handleDelete.bind(this);

        // Forcing some actions
        this.handleTypeChange();
    }

    setId(newId: string): void {

    }

    handleDelete(): void {
        this.uiElement.rootElement.remove();
        deleteWorkbenchComponent(this);
    }

    handleTypeChange(): void {

    }

    toJson(): string {
        return JSON.stringify(this.data);
    }

    fromJson(): boolean {
        return false;
    }

    public static createNew(eRootElement: HTMLElement): WorkbenchContextComponent {
        const id: string = Date.now().toString();

        return new WorkbenchContextComponent(
            new WorkbenchContextComponentInterface(
                id,
                eRootElement,
            ),
            new WorkbenchContextComponentData(
                id,
            ),
        );
    }
}


// ----------------
//  ???
// ----------------

export let workbenchContextComponents: WorkbenchContextComponent[] = [];

function deleteWorkbenchComponent(deletedComponent: WorkbenchContextComponent) {
    workbenchContextComponents = workbenchContextComponents.filter(item => item !== deletedComponent);
    if(workbenchContextComponents.length < 1) {
        eContextStatusMessage!.hidden = false;
    }
}


// ----------------
//  ???
// ----------------

//
let eTemplateContextComponent: HTMLElement | DocumentFragment | null = null;

let eContextStatusMessage = null;

// Preparing the context components buttons.
// Those are simply used to add and debug context components.
let eContextAddButton: HTMLButtonElement | null = null;

let isWorkbenchContextSetup = false;

export function setupWorkbenchContext() {
    if (!isWorkbenchContextSetup) {
        console.debug("Preparing UI for workbench context components...");

        eTemplateContextComponent = document.getElementById("template-context-component");
        if(eTemplateContextComponent === null) {
            alert(localize("error.ui.context.noTemplate"));
            throw Error(localize("error.ui.context.noTemplate"));
        }

        // Cloning and deleting from DOM.
        eTemplateContextComponent = (eTemplateContextComponent.cloneNode(true) as HTMLTemplateElement).content;
        document.getElementById("template-context-component")!.remove();

        const eContextTypes = eTemplateContextComponent.getElementById(idContextComponentTypes);
        const eContextSets = eTemplateContextComponent.getElementById(idContextComponentSets);
        const eContextUnits = eTemplateContextComponent.getElementById(idContextComponentUnit);
        const eContextScales = eTemplateContextComponent.getElementById(idContextComponentScale);
        if([eContextTypes, eContextSets, eContextUnits, eContextScales].some((item) => item === null)) {
            alert(localize("error.ui.context.noSets"));
            throw Error(localize("error.ui.context.noSets"));
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

        eContextStatusMessage = document.getElementById("fw-text-context-middle");
        if(eContextStatusMessage === null) {
            alert(localize("error.ui.context.noStatus"));
            throw Error(localize("error.ui.context.noStatus"));
        }

        eContextAddButton = document.querySelector("button#fw-button-add-context");
        if(eContextAddButton === null) {
            alert(localize("error.ui.context.missingButton"));
            throw Error(localize("error.ui.context.missingButton"));
        }

        eContextAddButton.onclick = function() {
            console.group("Adding new context component to workbench...");

            console.debug("Copying the template...");
            // We only get the fragment via the template, we have to use this monstrosity to get a proper element out of it.
            const eNewContextComponent=
                (eTemplateContextComponent!.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
            if(eNewContextComponent === null) {
                alert(localize("error.ui.context.component.cannotGetElement"));
                throw Error(localize("error.ui.context.component.cannotGetElement"));
            }

            console.debug("Instantiating and saving the 'WorkbenchContextComponent'...");
            const newContextComponent = WorkbenchContextComponent.createNew(
                eNewContextComponent
            );
            workbenchContextComponents.push(newContextComponent);

            console.debug("> ID: " + newContextComponent.data.id);

            console.debug("Inserting the element in the DOM...");
            eContextStatusMessage!.parentNode!.insertBefore(newContextComponent.uiElement.rootElement, eContextStatusMessage!);
            eContextStatusMessage!.hidden = true;

            console.groupEnd();
        }

        isWorkbenchContextSetup = true;
    }
}
