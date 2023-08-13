import { Decimal } from "../../../../resources/DecimalJs/10.4.3/decimal.min.mjs";
import { localize } from "./lang.js";
export class Unit {
    constructor(unitKey, symbol, scale) {
        this.name = localize("unit." + unitKey + ".name");
        this.symbol = symbol;
        this.scale = scale;
        this.description = localize("unit." + unitKey + ".desc");
    }
}
export const scales = {
    SI: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_DISTANCE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    IMPERIAL_WEIGHT: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    TIME_SECONDS: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.symbol;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
    NONE: new class {
        constructor() {
            this.formatName = (unit) => {
                return unit.name;
            };
            this.formatSymbol = (unit) => {
                return unit.symbol;
            };
            this.scaleFactors = [];
        }
    },
};
export const scaleFactors = {
    SI_GIGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e9');
            this.prefix = "giga";
            this.suffix = "";
            this.symbol = "G";
        }
    },
    SI_MEGA: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e6');
            this.prefix = "mega";
            this.suffix = "";
            this.symbol = "M";
        }
    },
    SI_KILO: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e3');
            this.prefix = "kilo";
            this.suffix = "";
            this.symbol = "k";
        }
    },
    SI_BASE: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    SI_CENTI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-2');
            this.prefix = "centi";
            this.suffix = "";
            this.symbol = "c";
        }
    },
    SI_MILLI: new class {
        constructor() {
            this.scale = scales.SI;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_MILLI: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1e-3');
            this.prefix = "milli";
            this.suffix = "";
            this.symbol = "m";
        }
    },
    TIME_BASE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('1');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_MINUTE: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('60');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_HOUR: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('3600');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
    TIME_DAY: new class {
        constructor() {
            this.scale = scales.TIME_SECONDS;
            this.multiplier = new Decimal('86400');
            this.prefix = "";
            this.suffix = "";
            this.symbol = "";
        }
    },
};
export const units = {
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
export function scaleToBase(value, scaleFactor) {
    return value.times(scaleFactor.multiplier);
}
export function scaleFromBase(value, scaleFactor) {
    return value.dividedBy(scaleFactor.multiplier);
}
let areUnitsInitialized = false;
export function initUnits() {
    if (!areUnitsInitialized) {
        console.debug("Initializing scales & units...");
        Object.keys(scaleFactors).forEach(scaleFactorKey => {
            const scaleFactor = scaleFactors[scaleFactorKey];
            scaleFactor.scale.scaleFactors.push(scaleFactor);
        });
        areUnitsInitialized = true;
    }
}
//# sourceMappingURL=units.js.map