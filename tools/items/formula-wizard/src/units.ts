// ==- Basic Info -================================
//     Name: Formula Wizard - Units
//     File: tools/items/formula-wizard/src/units.ts
//  Version: N/A
//   Author: Herwin Bozet
//
// ==- Requirements -==============================
//  DecimalJS: https://github.com/MikeMcl/decimal.js/  (MIT)
//
// ==- Links & License -===========================
//  License: Unlicense
//   GitHub: https://github.com/aziascreations/Web-NibblePoker

// -----------------
//  Units > Imports
// -----------------

import {Decimal} from '../../../../resources/DecimalJs/10.4.3/decimal';

import {localize} from "./lang";


// -----------------------------------------------
//  Units > Type Definition, Classes & Interfaces
// -----------------------------------------------

export interface UnitScale {
    formatName: (unit: Unit) => string;
    formatSymbol: (unit: Unit) => string;
    scaleFactors: UnitScaleFactor[];
}

export interface UnitScaleFactor {
    scale: UnitScale

    prefix: string;
    suffix: string;
    symbol: string;

    /** Multiplier to go from scaled to base value */
    // Not the most intuitive IMO, but it is similar to the standard power notation for SI.
    multiplier: Decimal;
}

export class Unit {
    name: string;
    symbol: string;
    description: string;
    scale: UnitScale;

    constructor(unitKey: string, symbol: string, scale: UnitScale) {
        this.name = localize("unit." + unitKey + ".name");
        this.symbol = symbol;
        this.scale = scale;
        this.description = localize("unit." + unitKey + ".desc");
    }
}


// ---------------------
//  Units > Collections
// ---------------------

export const scales= {
    SI: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    IMPERIAL_DISTANCE: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    IMPERIAL_WEIGHT: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    TIME_SECONDS: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.symbol
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
    NONE: new class implements UnitScale {
        formatName = (unit: Unit): string => {
            return unit.name
        };
        formatSymbol = (unit: Unit): string => {
            return unit.symbol
        };
        scaleFactors = [];
    },
};

export const scaleFactors: { [key: string]: UnitScaleFactor } = {
    SI_GIGA: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e9');
        prefix = "giga";
        suffix = "";
        symbol = "G";
    },
    SI_MEGA: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e6');
        prefix = "mega";
        suffix = "";
        symbol = "M";
    },
    SI_KILO: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e3');
        prefix = "kilo";
        suffix = "";
        symbol = "k";
    },
    SI_BASE: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    SI_CENTI: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e-2');
        prefix = "centi";
        suffix = "";
        symbol = "c";
    },
    SI_MILLI: new class implements UnitScaleFactor {
        scale = scales.SI;
        multiplier = new Decimal('1e-3');
        prefix = "milli";
        suffix = "";
        symbol = "m";
    },

    TIME_MILLI: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('1e-3');
        prefix = "milli";
        suffix = "";
        symbol = "m";
    },
    TIME_BASE: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('1');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_MINUTE: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('60');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_HOUR: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('3600');
        prefix = "";
        suffix = "";
        symbol = "";
    },
    TIME_DAY: new class implements UnitScaleFactor {
        scale = scales.TIME_SECONDS;
        multiplier = new Decimal('86400');
        prefix = "";
        suffix = "";
        symbol = "";
    },
};

export const units: { [key: string]: Unit } = {
    ANY: new Unit("any", "", scales.NONE),

    WATT: new Unit("watt", "W", scales.SI),
    VOLT: new Unit("volt", "V", scales.SI),
    AMPERE: new Unit("ampere", "A", scales.SI),
    OHM: new Unit("ohm", "Ω", scales.SI),
    FARAD: new Unit("farad", "F", scales.SI),
    METER: new Unit("meter", "m", scales.SI),

    INCH: new Unit("inch", "in", scales.IMPERIAL_DISTANCE),
    POUND: new Unit("pound", "p", scales.IMPERIAL_WEIGHT),
};


// -----------------
//  Units > Helpers
// -----------------
export function scaleToBase(value: Decimal, scaleFactor: UnitScaleFactor): Decimal {
    return value.times(scaleFactor.multiplier);
}

export function scaleFromBase(value: Decimal, scaleFactor: UnitScaleFactor): Decimal {
    return value.dividedBy(scaleFactor.multiplier);
}

// ---------------------------
//  Units > On-Import Handler
// ---------------------------

let areUnitsInitialized = false;
export function initUnits() {
    if (!areUnitsInitialized) {
        console.debug("Initializing scales & units...");

        // Adding the `UnitScaleFactor` in their respective `UnitScale`.
        Object.keys(scaleFactors).forEach(scaleFactorKey => {
            // @ts-ignore - Ignoring BS implicit any.
            const scaleFactor: UnitScaleFactor = scaleFactors[scaleFactorKey];
            scaleFactor.scale.scaleFactors.push(scaleFactor);
        });

        areUnitsInitialized = true;
    }
}

