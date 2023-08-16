/*
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

import {localize} from "./lang";
import {isCatalogInitialized, catalogFormulas} from "./ui_catalog";

// -----------
//  Constants
// -----------

const ID_TEMPLATE_FORMULA = "template-workbench-formula";
const ID_TEMPLATE_FORMULA_VALUE = ID_TEMPLATE_FORMULA + "-value";

const ID_FORMULA_PREFIX = "fw-workbench-formula-";
const ID_FORMULA_SPAWN_POINT = ID_FORMULA_PREFIX + "spawn";

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

let eTemplateWorkbenchFormula: HTMLElement | DocumentFragment | null = null;
let eTemplateWorkbenchFormulaValue: HTMLElement | DocumentFragment | null = null;

export let workbenchFormulas: WorkbenchFormula[] = [];


// ----------------------
//  Global-related utils
// ----------------------

function deleteWorkbenchFormula(deletedFormula: WorkbenchFormula, removeDom: boolean = true) {
    workbenchFormulas = workbenchFormulas.filter(item => item !== deletedFormula);
    //if(removeDom) {
    //    //deletedFormula.uiElement
    //}
    //if(workbenchContextComponents.length < 1) {
    //    eContextStatusMessage!.hidden = false;
    //}
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

    constructor(controllerId: string) {
        this.id = controllerId;
    }
}

class WorkbenchFormulaValueInterface {

}

class WorkbenchFormulaValue {
    uiElement: WorkbenchFormulaValueInterface;
    data: WorkbenchFormulaValueData;

    constructor(uiElement: WorkbenchFormulaValueInterface, data: WorkbenchFormulaValueData) {
        this.uiElement = uiElement;
        this.data = data;
    }

    public static createNew(eRootElement: HTMLElement): WorkbenchFormulaValue {
        const id: string = Date.now().toString();

        return null!;
    }
}


// --------------
//  Formulas MVC
// --------------

class WorkbenchFormulaData {
    id: string;

    constructor(controllerId: string) {
        this.id = controllerId;
    }
}

class WorkbenchFormulaInterface {

}

class WorkbenchFormula {
    uiElement: WorkbenchFormulaInterface;
    data: WorkbenchFormulaData;

    constructor(uiElement: WorkbenchFormulaInterface, data: WorkbenchFormulaData) {
        this.uiElement = uiElement;
        this.data = data;
    }

    public static createNew(eRootElement: HTMLElement): WorkbenchFormula {
        const id: string = Date.now().toString();

        return null!;
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

        console.debug("Grabbing & processing the templates from the DOM...");
        eTemplateWorkbenchFormula = document.getElementById(ID_TEMPLATE_FORMULA);
        eTemplateWorkbenchFormulaValue = document.getElementById(ID_TEMPLATE_FORMULA_VALUE);
        if(eTemplateWorkbenchFormula === null || eTemplateWorkbenchFormulaValue === null) {
            console.groupEnd();
            alert(localize("error.ui.workbench.noTemplate"));
            throw Error(localize("error.ui.workbench.noTemplate"));
        }
        eTemplateWorkbenchFormula = (eTemplateWorkbenchFormula.cloneNode(true) as HTMLTemplateElement).content;
        eTemplateWorkbenchFormulaValue = (eTemplateWorkbenchFormulaValue.cloneNode(true) as HTMLTemplateElement).content;

        console.debug("Grabbing the anchor point for new formulas...");
        const eWorkbenchFormulaSpawnPoint: HTMLAnchorElement | null = document.querySelector(`a#${ID_FORMULA_SPAWN_POINT}`);
        if(eWorkbenchFormulaSpawnPoint === null) {
            console.groupEnd();
            alert(localize("error.ui.workbench.noAnchor"));
            throw Error(localize("error.ui.workbench.noAnchor"));
        }

        // catalogFormulas




        isWorkbenchFormulaSetup = true;

        console.groupEnd();
    }
}
