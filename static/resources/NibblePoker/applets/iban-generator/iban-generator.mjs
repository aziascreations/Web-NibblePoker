// NibblePoker - IBAN Generator
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

import {isValidIban, parseStandardIban, IbanSpecification, countriesSpecs, getIbanChecksumFromParts} from "../../libs/iban.mjs";

//console.log(getIbanChecksumFromParts("CH", "002300A1023502601"));

console.log(parseStandardIban("LU220108783391941421"));
//Iban.fromIban("BEjhkjkldfjslkfjsd");
