/*!
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 *  Unlicense Licence
 */
const version = [0, 0, 2];
console.log("Initializing 'Formula Wizard v" + version.join(".") + "'...");
const startTime = new Date().getMilliseconds();
import { Decimal } from "../../../../resources/DecimalJs/10.4.3/decimal.min.mjs";
import { localize } from "./lang.js";
import { units, initUnits } from "./units.js";
import { formulas, initFormulas } from "./formulas.js";
import { initCatalog } from "./ui_catalog.js";
import { setupWorkbenchContext } from "./mvc_context.js";
Decimal.set({ precision: 25, rounding: 8 });
initUnits();
initFormulas();
initCatalog();
setupWorkbenchContext();
console.log(localize("joe.mama"));
console.log(units);
console.log(formulas);
//# sourceMappingURL=main.js.map