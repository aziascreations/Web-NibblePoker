/*!
 *  NibblePoker - Formula Wizard
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

// Preparing some things before the import statements.
const version = [0, 0, 3];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
const startTime = new Date().getMilliseconds();

// Importing stuff
import {Decimal} from '../../../../resources/DecimalJs/10.4.3/decimal';
import {localize} from "./lang";
import {units, initUnits} from "./units";
import {formulas, initFormulas} from "./formulas";
import {initCatalog} from "./ui_catalog";
import {setupWorkbenchContext} from "./mvc_context";
import {setupWorkbenchFormula} from "./mvc_formula";

// Configuring the Decimal.JS library to use its maximum potential precision.
Decimal.set({ precision: 25, rounding: 8 });

// Setting up common collections
initUnits();
initFormulas();

// Preparing the UI & MVC stuff
initCatalog();
setupWorkbenchContext();
setupWorkbenchFormula();

// ???

// Tests
console.log(units);
console.log(formulas);

const endTime = new Date().getMilliseconds();
console.log("Done, took " + (endTime - startTime) + "ms !");
