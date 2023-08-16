/*
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 */

import {localize} from "./lang";
import {isCatalogInitialized, catalogFormulas} from "./ui_catalog";
import {FormulaValue, FormulaVariant} from "./formulas";
import {retrieveTemplate, makeElementFromFragment, appendToAllIds} from "./utils_templates";

// -----------
//  Constants
// -----------

const ID_TEMPLATE_FORMULA = "template-workbench-formula";
const ID_TEMPLATE_FORMULA_VALUE = ID_TEMPLATE_FORMULA + "-value";

const ID_FORMULA_PREFIX = "fw-workbench-formula-";
const ID_FORMULA_SPAWN_POINT = ID_FORMULA_PREFIX + "spawn";
const ID_FORMULA_NAME = ID_FORMULA_PREFIX + "name";
const ID_FORMULA_INPUTS = ID_FORMULA_PREFIX + "inputs";
const ID_FORMULA_OUTPUTS = ID_FORMULA_PREFIX + "outputs";

const ID_FORMULA_VALUE_PREFIX = ID_FORMULA_PREFIX + "value-";
const ID_FORMULA_VALUE_ID = ID_FORMULA_VALUE_PREFIX + "id";
const ID_FORMULA_VALUE_NAME = ID_FORMULA_VALUE_PREFIX + "name";
const ID_FORMULA_VALUE_LINK = ID_FORMULA_VALUE_PREFIX + "link";
const ID_FORMULA_VALUE_TEST_VALUE = ID_FORMULA_VALUE_PREFIX + "test-value";
const ID_FORMULA_VALUE_TEST_SCALE = ID_FORMULA_VALUE_PREFIX + "test-scale";
const ID_FORMULA_VALUE_TEST_VALUE_SET = ID_FORMULA_VALUE_PREFIX + "test-value-set";

//const idWorkbenchFormulaPrefix = "fw-workbench-formula-";
//const idWorkbenchFormulaSpawnPoint = idWorkbenchFormulaPrefix + "spawn";
//
//// Formula template
//const idTemplateFormula = "template-workbench-formula";
//const idFormulaName = idWorkbenchFormulaPrefix + "name";
//const idFormulaInputs = idWorkbenchFormulaPrefix + "inputs";
//const idFormulaOutputs = idWorkbenchFormulaPrefix + "outputs";
//
//// FormulaUnit template
//const classTemplateFormulaValue = "formula-value-input-form";
//const idTemplateFormulaValue = idTemplateFormula + "-value";
//const idFormulaValuePrefix = idWorkbenchFormulaPrefix + "value-";
//const idFormulaValueId = idFormulaValuePrefix + "id";
//const idFormulaValueName = idFormulaValuePrefix + "name";
//const idFormulaValueLink = idFormulaValuePrefix + "link";
//const idFormulaValueTestValue = idFormulaValuePrefix + "test-value";
//const idFormulaValueTestScale = idFormulaValuePrefix + "test-scale";
//const idFormulaValueTestValueSet = idFormulaValuePrefix + "test-value-set";




// ---------
//  Globals
// ---------

let eTemplateWorkbenchFormula: DocumentFragment | null = null;
let eTemplateWorkbenchFormulaValue: DocumentFragment | null = null;

export let workbenchFormulas: WorkbenchFormula[] = [];


// ----------------------
//  Global-related utils
// ----------------------

function deleteWorkbenchFormula(deletedFormula: WorkbenchFormula, removeDom: boolean = true) {
    workbenchFormulas = workbenchFormulas.filter(item => item !== deletedFormula);
    if(removeDom) {
        deletedFormula.uiElement.eRootElement.remove();
    }
}

function handleCatalogInsertion(formulaVariant: FormulaVariant, eSpawnPointAnchor: HTMLAnchorElement) {
    console.group("Adding new formula to workbench...");

    console.debug("Instantiating 'WorkbenchFormula'...");
    const newWorkbenchFormula = new WorkbenchFormula(
        eTemplateWorkbenchFormula as DocumentFragment,
        eTemplateWorkbenchFormulaValue as DocumentFragment,
        formulaVariant
    );

    console.debug("Registering controller...");
    workbenchFormulas.push(newWorkbenchFormula);

    console.debug("Adding to workbench's DOM...");
    eSpawnPointAnchor!.parentNode!.insertBefore(newWorkbenchFormula.uiElement.eRootElement, eSpawnPointAnchor);

    console.debug(newWorkbenchFormula);

    console.groupEnd();
}

// --------------------
//  Formula Values MVC
// --------------------

enum EWorkbenchFormulaValueTypes {
    //UNKNOWN,
    INPUT,
    OUTPUT,
}

class WorkbenchFormulaValueData {
    id: string;
    valueType: EWorkbenchFormulaValueTypes
    formulaValue: FormulaValue;

    constructor(controllerId: string, valueType: EWorkbenchFormulaValueTypes, formulaValue: FormulaValue) {
        this.id = controllerId;
        this.valueType = valueType;
        this.formulaValue = formulaValue;
    }
}

class WorkbenchFormulaValueInterface {
    public eRootElement: HTMLElement;

    private readonly eFormulaValueId: HTMLInputElement;
    private readonly eFormulaValueName: HTMLParagraphElement;
    private readonly eFormulaValueLink: HTMLSelectElement;
    private readonly eFormulaValueTestValue: HTMLInputElement;
    private readonly eFormulaValueTestScale: HTMLSelectElement;
    private readonly eFormulaValueTestValueSet: HTMLInputElement;

    constructor(eRootFragment: DocumentFragment, setupValueType: EWorkbenchFormulaValueTypes) {
        this.eRootElement = makeElementFromFragment(eRootFragment);

        // Grabbing references to all the form's fields.
        this.eFormulaValueId = this.eRootElement.querySelector(`input#${ID_FORMULA_VALUE_ID}`)!;
        this.eFormulaValueName = this.eRootElement.querySelector(`p#${ID_FORMULA_VALUE_NAME}`)!;
        this.eFormulaValueLink = this.eRootElement.querySelector(`select#${ID_FORMULA_VALUE_LINK}`)!;
        this.eFormulaValueTestValue = this.eRootElement.querySelector(`input#${ID_FORMULA_VALUE_TEST_VALUE}`)!;
        this.eFormulaValueTestScale = this.eRootElement.querySelector(`select#${ID_FORMULA_VALUE_TEST_SCALE}`)!;
        this.eFormulaValueTestValueSet = this.eRootElement.querySelector(`select#${ID_FORMULA_VALUE_TEST_VALUE_SET}`)!;

        if([this.eFormulaValueId, this.eFormulaValueName, this.eFormulaValueLink, this.eFormulaValueTestValue,
            this.eFormulaValueTestScale, this.eFormulaValueTestValueSet].some((item) => item === null)) {
            alert("error.ui.formula.value.missingElement");
            throw Error("error.ui.formula.value.missingElement");
        }

        //// Adding the relevant scale factors.
        //populateScaleSelectForUnit(this.formulaValue.unit, this.eFormulaValueTestScale, this.formulaValue.scaleFactor);

        //if(setupValueType === EWorkbenchFormulaValueTypes.INPUT) {
        //    this.setupInput();
        //} else {
        //    this.setupOutput();
        //}
    }

    toggleField(eFormField: HTMLElement, hidden: boolean) {
        // We hide the parent "tr" element.
        (eFormField.parentNode!.parentNode! as HTMLElement).hidden = hidden;
    }

    private setupInput() {
        this.toggleField(this.eFormulaValueId, true);
        this.eFormulaValueTestValue.value = "0";
        //this.eFormulaValueTestValue.onchange = this.onTestFieldChange.bind(this);
        //this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }

    private setupOutput() {
        this.toggleField(this.eFormulaValueLink, true);
        //this.eFormulaValueTestValue.readOnly = true;
        //this.eFormulaValueTestScale.onchange = this.onTestFieldChange.bind(this);
    }

    setName(newName: string) {
        this.eFormulaValueName.innerText = newName;
    }
}

class WorkbenchFormulaValue {
    data: WorkbenchFormulaValueData;
    uiElement: WorkbenchFormulaValueInterface;

    constructor(eRootFragment: DocumentFragment, valueType: EWorkbenchFormulaValueTypes,
                parentAssignedControllerId: string, formulaValue: FormulaValue) {
        this.data = new WorkbenchFormulaValueData(parentAssignedControllerId, valueType, formulaValue);
        this.uiElement = new WorkbenchFormulaValueInterface(eRootFragment, valueType);

        this.setName(`${this.data.formulaValue.unit.name} (${this.data.formulaValue.unit.symbol})`);
    }

    setName(newName: string) {
        this.uiElement.setName(newName);
    }
}


// --------------
//  Formulas MVC
// --------------

class WorkbenchFormulaData {
    id: string;
    formulaVariant: FormulaVariant;

    constructor(controllerId: string, formulaVariant: FormulaVariant) {
        this.id = controllerId;
        this.formulaVariant = formulaVariant;
    }
}

class WorkbenchFormulaInterface {
    public eRootElement: HTMLElement;

    private readonly eTitle: HTMLParagraphElement;
    public readonly eInputsContainer: HTMLDivElement;
    public readonly eOutputsContainer: HTMLDivElement;

    constructor(eRootFragment: DocumentFragment) {
        this.eRootElement = makeElementFromFragment(eRootFragment);

        this.eTitle = this.eRootElement.querySelector(`p#${ID_FORMULA_NAME}`)!;
        this.eInputsContainer = this.eRootElement.querySelector(`div#${ID_FORMULA_INPUTS}`)!;
        this.eOutputsContainer = this.eRootElement.querySelector(`div#${ID_FORMULA_OUTPUTS}`)!;

        if([this.eTitle, this.eInputsContainer, this.eOutputsContainer].some((item) => item === null)) {
            alert(localize("error.ui.formula.missingElement"));
            throw Error(localize("error.ui.formula.missingElement"));
        }
    }

    setTitle(newTitle: string) {
        this.eTitle.innerText = newTitle;
    }
}

class WorkbenchFormula {
    uiElement: WorkbenchFormulaInterface;
    data: WorkbenchFormulaData;

    inputControllers: WorkbenchFormulaValue[];
    outputControllers: WorkbenchFormulaValue[];

    constructor(fragRootElement: DocumentFragment, fragValueElement: DocumentFragment, formulaVariant: FormulaVariant) {
        const id: string = Date.now().toString();

        // Preparing core MVC components.
        this.uiElement = new WorkbenchFormulaInterface(fragRootElement);
        this.data = new WorkbenchFormulaData(id, formulaVariant);

        // Preparing children MVC components.
        let valueIdSuffix = 0;
        this.inputControllers = this.data.formulaVariant.getInputValuesDefinition().map(
            inputFormulaValue => new WorkbenchFormulaValue(
                fragValueElement,
                EWorkbenchFormulaValueTypes.INPUT,
                this.data.id + (valueIdSuffix++).toString(),
                inputFormulaValue
            )
        );
        this.outputControllers = [this.data.formulaVariant.getOutputValueDefinition()].map(
            outputFormulaValue => new WorkbenchFormulaValue(
                fragValueElement,
                EWorkbenchFormulaValueTypes.OUTPUT,
                this.data.id + (valueIdSuffix++).toString(),
                outputFormulaValue
            )
        );

        // Preparing the interface...
        this.setTitle(this.data.formulaVariant.parentFormula.name);

        // Adding the value elements into their proper container.
        this.inputControllers.every(inputController =>
            this.uiElement.eInputsContainer.appendChild(inputController.uiElement.eRootElement));
        this.outputControllers.every(outputController =>
            this.uiElement.eOutputsContainer.appendChild(outputController.uiElement.eRootElement));

        // Finalizing the interface by making its IDs unique.
        // This is purely a UX thing to ensure proper input selection via the labels.
        appendToAllIds(this.uiElement.eRootElement, this.data.id);
    }

    public setTitle(newTitle: string) {
        this.uiElement.setTitle(newTitle);
    }
}


// ----------------
//  ???
// ----------------

let isWorkbenchFormulaSetup = false;

export function setupWorkbenchFormula() {
    if (!isWorkbenchFormulaSetup) {
        console.group("Preparing UI for workbench formula components...");

        console.debug("Checking if the catalog is ready...");
        if(!isCatalogInitialized()) {
            console.groupEnd();
            alert(localize("error.ui.workbench.catalog.no-init"));
            throw Error(localize("error.ui.workbench.catalog.no-init"));
        }

        console.debug("Grabbing, processing & removing the templates from the DOM...");
        eTemplateWorkbenchFormula = retrieveTemplate(ID_TEMPLATE_FORMULA, true);
        eTemplateWorkbenchFormulaValue = retrieveTemplate(ID_TEMPLATE_FORMULA_VALUE, true);

        console.debug("Grabbing the anchor point for new formulas...");
        const eWorkbenchFormulaSpawnPoint: HTMLAnchorElement | null = document.querySelector(`a#${ID_FORMULA_SPAWN_POINT}`);
        if(eWorkbenchFormulaSpawnPoint === null) {
            console.groupEnd();
            alert(localize("error.ui.workbench.noAnchor"));
            throw Error(localize("error.ui.workbench.noAnchor"));
        }

        console.debug("Preparing the catalog's buttons actions & inserting them in the DOM");
        catalogFormulas.forEach(catalogFormula => {
            for(let iVariant = 0; iVariant < catalogFormula.formula.variants.length; iVariant++) {
                catalogFormula.eVariantButtons[iVariant].onclick = function (){
                    handleCatalogInsertion(catalogFormula.formula.variants[iVariant], eWorkbenchFormulaSpawnPoint);
                }
            }

            catalogFormula.insertIntoCategories();
        });

        isWorkbenchFormulaSetup = true;

        console.groupEnd();
    }
}
