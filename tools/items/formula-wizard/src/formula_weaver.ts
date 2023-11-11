/*
 *  Formula Wizard v0.0.2
 *  [Short desc here]
 *  https://github.com/aziascreations/Web-NibblePoker
 *  Copyright (c) 2023 Herwin Bozet <herwin.bozet@gmail.com>
 */

// Note:
// The weaver's behavior could have implemented directly into the "WorkbenchFormula", "WorkbenchFormulaValue" and
//   "WorkbenchContextComponent" controller classes.
// However, I chose not to do that and add extra re-linking steps in order to keep the MVC models separate from
//   the final formulas used for graphing and doing single-formula live tests.
// Additionally, it separates the "Number Prolapsing Machine" from using the MVC's functions directly, which will
//   allow for easier upgrades and modifications to each part.


