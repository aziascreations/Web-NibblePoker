// NibblePoker - IBAN Generator
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

import {
    parseStandardIban,
    IbanSpecification,
    countriesSpecs,
    getIbanChecksumFromParts,
    StandardIban
} from "../../libs/iban.mjs";

//console.log(getIbanChecksumFromParts("CH", "002300A1023502601"));

console.log(parseStandardIban("LU220108783391941421"));

console.log(new StandardIban("LU", "0108783391941421", countriesSpecs.LU).toString());
console.log(new StandardIban("LU", "123456ABCDEFGHIL", countriesSpecs.LU).toString());

console.log(Object.keys(countriesSpecs));
