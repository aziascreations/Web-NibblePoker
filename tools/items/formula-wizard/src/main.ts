/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */

// Preparing some things before the import statements.
const version = [0, 0, 2];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
const startTime = new Date().getMilliseconds();

// Importing stuff
import {Decimal} from '../../../../resources/DecimalJs/10.4.3/decimal';
import {localize} from "./lang";
import {units, initUnits} from "./units";
import {formulas, initFormulas} from "./formulas";
import {initCatalog} from "./ui_catalog";
import {setupWorkbenchContext} from "./mvc_context"

// Configuring the Decimal.JS library to use its maximum potential precision.
Decimal.set({ precision: 25, rounding: 8 });

// Setting up non-primary things
initUnits();
initFormulas();

initCatalog();
setupWorkbenchContext();

// Tests
console.log(localize("joe.mama"));
console.log(units);
console.log(formulas);
