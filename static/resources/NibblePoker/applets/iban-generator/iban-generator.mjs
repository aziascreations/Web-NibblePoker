// NibblePoker - IBAN Generator
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)
// Sources:
//  * https://www.swift.com/standards/data-standards/iban-international-bank-account-number  (Updated December 2024)

export class Iban {
    /** @type {string} */
    countryCode;
    /** @type {number} */
    checksum;
    /** @type {string[]} */
    parts;
    /** @type {IbanSpecification|null} */
    relevantSpec;
}

export class IbanSpecification {
    /**
     * ISO-3166 Country Code
     * @type {string}
     */
    countryCode;
    /** @type {string} */
    countryName;
    /** @type {number} */
    ibanLength;
    /** @type {string} */
    ibanFormat;
    /** @type {number} */
    bbanLength;
    /** @type {string} */
    bbanFormat;
    /** @type {RegExp} */
    ibanRegex;
    /** @type {boolean} */
    isSepa;

    /**
     * @param countryCode {string}
     * @param countryName {string}
     * @param ibanLength {number}
     * @param ibanFormat {string}
     * @param bbanLength {number}
     * @param bbanFormat {string}
     * @param ibanRegex {RegExp}
     * @param isSepa {boolean}
     */
    constructor(countryCode, countryName, ibanLength, ibanFormat,
                bbanLength, bbanFormat, ibanRegex, isSepa) {
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.ibanLength = ibanLength;
        this.ibanFormat = ibanFormat;
        this.bbanLength = bbanLength;
        this.bbanFormat = bbanFormat;
        this.ibanRegex = ibanRegex;
        this.isSepa = isSepa;
    }

    /**
     * Returns the <i>Bank Identifier</i> from the given IBAN.
     * The <i>Bank Identifier</i> may or may not include the <i>Branch Identifier</i>.
     * @param iban {string}
     * @returns {string}
     */
    getFormattedBankId(iban) {
        return "";
    }

    /**
     * @param iban {string}
     * @returns {string}
     */
    getFormattedBranchId(iban) {
        return "";
    }

    /**
     * Formats the IBAN by adding spaces and other characters where necessary.
     * @param iban {string}
     * @returns {string}
     */
    getFormattedIban(iban) {
        return iban.match(/.{1,4}/g).join(' ');
    }
}

export const countriesIbanSpecs = {
    AD: new IbanSpecification(
        "AD", 'Andorra',
        24, "AD2!n4!n4!n12!c",
        20, "4!n4!n12!c",
        new RegExp(
            "^(?<prefix>AD)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9a-zA-Z]{12})" +
            ")$", "g"),
        true
    ),
    AE: new IbanSpecification(
        "AE", 'United Arab Emirates (The)',
        23, "AE2!n3!n16!n",
        19, "3!n16!n",
        new RegExp(
            "^(?<prefix>AE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{16})" +
            ")$", "g"),
        false
    ),
    AL: new IbanSpecification(
        "AL", 'Albania',
        28, "AL2!n8!n16!c",
        24, "8!n16!c",
        new RegExp(
            "^(?<prefix>AL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>" +
                    "[0-9]{3}" +
                    "(?<branchId>[0-9]{4})" +
                    "[0-9]{1}" +
                ")" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        false
        // FIXME: Has a special bank id format "212-1100-9"
    ),
    AT: new IbanSpecification(
        "AT", 'Austria',
        20, "AT2!n5!n11!n",
        16, "5!n11!n",
        new RegExp(
            "^(?<prefix>AT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9]{11})" +
            ")$", "g"),
        true
    ),
    AZ: new IbanSpecification(
        "AZ", 'Azerbaijan',
        28, "AZ2!n4!a20!c",
        24, "4!a20!c",
        new RegExp(
            "^(?<prefix>AZ)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{20})" +
            ")$", "g"),
        false
    ),
    BA: new IbanSpecification(
        "BA", 'Bosnia and Herzegovina',
        20, "BA2!n3!n3!n8!n2!n",
        16, "3!n3!n8!n2!n",
        new RegExp(
            "^(?<prefix>BA)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{8})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    BE: new IbanSpecification(
        "BE", 'Belgium',
        16, "BE2!n3!n7!n2!n",
        12, "3!n7!n2!n",
        new RegExp(
            "^(?<prefix>BE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{7})" +
                "([0-9]{2})" +
            ")$", "g"),
        true
    ),
    BG: new IbanSpecification(
        "BG", 'Bulgaria',
        22, "BG2!n4!a4!n2!n8!c",
        18, "4!a4!n2!n8!c",
        new RegExp(
            "^(?<prefix>BG)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9]{2})" +
                "([0-9a-zA-Z]{8})" +
            ")$", "g"),
        true
    ),
    BH: new IbanSpecification(
        "BH", 'Bahrain',
        22, "BH2!n4!a14!c",
        18, "4!a14!c",
        new RegExp(
            "^(?<prefix>BH)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{14})" +
            ")$", "g"),
        false
    ),
    BI: Object.assign(new IbanSpecification(
        "BI", 'Burundi',
        27, "BI2!n5!n5!n11!n2!n",
        23, "5!n5!n11!n2!n",
        new RegExp(
            "^(?<prefix>BI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ), {
        getFormattedIban(iban) {
            return [
                iban.substring(0, 4),
                iban.substring(4, 9),
                iban.substring(9, 14),
                iban.substring(14, 25),
                iban.substring(25, 27),
            ].join(' ');
        }
    }),
    BR: new IbanSpecification(
        "BR", 'Brazil',
        29, "BR2!n8!n5!n10!n1!a1!c",
        25, "8!n5!n10!n1!a1!c",
        new RegExp(
            "^(?<prefix>BR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{8})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9]{10})" +
                "([A-Z])" +
                "([0-9a-zA-Z])" +
            ")$", "g"),
        false
    ),
    BY: new IbanSpecification(
        "BY", 'Republic of Belarus\n',
        28, "BY2!n4!c4!n16!c",
        24, "4!c4!n16!c",
        new RegExp(
            "^(?<prefix>BY)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9a-zA-Z]{4})" +
                "([0-9]{4})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        false
    ),
    CH: new IbanSpecification(
        "CH", 'Switzerland',
        21, "CH2!n5!n12!c",
        17, "5!n12!c",
        new RegExp(
            "^(?<prefix>CH)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9a-zA-Z]{12})" +
            ")$", "g"),
        true
    ),
    CR: new IbanSpecification(
        "CR", 'Costa Rica',
        22, "CR2!n4!n14!n",
        18, "4!n14!n",
        new RegExp(
            "^(?<prefix>CR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{14})" +
            ")$", "g"),
        false
    ),
    CY: new IbanSpecification(
        "CY", 'Cyprus',
        28, "CY2!n3!n5!n16!c",
        24, "3!n5!n16!c",
        new RegExp(
            "^(?<prefix>CY)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        true
    ),
    CZ: new IbanSpecification(
        "CZ", 'Czech Republic',
        24, "CZ2!n4!n6!n10!n\n",
        20, "4!n6!n10!n",
        new RegExp(
            "^(?<prefix>CZ)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{6})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    DE: new IbanSpecification(
        "DE", 'Germany',
        22, "DE2!n8!n10!n\n",
        18, "8!n10!n",
        new RegExp(
            "^(?<prefix>DE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{8})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    DJ: new IbanSpecification(
        "DJ", 'Djibouti',
        27, "DJ2!n5!n5!n11!n2!n\n",
        23, "5!n5!n11!n2!n\n",
        new RegExp(
            "^(?<prefix>DJ)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    DK: new IbanSpecification(
        "DK", 'Denmark',
        18, "DK2!n4!n9!n1!n",
        14, "4!n9!n1!n",
        new RegExp(
            "^(?<prefix>DK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{9})" +
                "([0-9])" +
            ")$", "g"),
        true
    ),
    DO: new IbanSpecification(
        "DO", 'Dominican Republic',
        28, "DO2!n4!c20!n",
        24, "4!c20!n",
        new RegExp(
            "^(?<prefix>DO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{20})" +
            ")$", "g"),
        false
    ),
    EE: new IbanSpecification(
        "EE", 'Estonia',
        20, "EE2!n2!n14!n",
        16, "2!n14!n",
        new RegExp(
            "^(?<prefix>EE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "([0-9]{14})" +
            ")$", "g"),
        true
    ),
    EG: Object.assign(new IbanSpecification(
        "EG", 'Egypt',
        29, "EG2!n4!n4!n17!n",
        25, "4!n4!n17!n",
        new RegExp(
            "^(?<prefix>EG)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9]{17})" +
            ")$", "g"),
        false
    ), {
        getFormattedIban(iban) {
            return iban;
        }
    }),
    ES: new IbanSpecification(
        "ES", 'Spain',
        24, "4!n4!n1!n1!n10!n",
        20, "ES2!n4!n4!n1!n1!n10!n",
        new RegExp(
            "^(?<prefix>ES)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9])" +
                "([0-9])" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    FI: new IbanSpecification(
        "FI", 'Finland',
        18, "3!n11!n",
        14, "FI2!n3!n11!n",
        new RegExp(
            "^(?<prefix>FI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{11})" +
            ")$", "g"),
        true
        // FIXME: Includes AX
    ),
    FK: new IbanSpecification(
        "FK", 'Falkland Islands',
        18, "2!a12!n",
        14, "FK2!n2!a12!n",
        new RegExp(
            "^(?<prefix>FK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{1})" +
                "([0-9]{12})" +
            ")$", "g"),
        false
    ),
    FO: new IbanSpecification(
        "FO", 'Faroe Islands',
        18, "FO2!n4!n9!n1!n",
        14, "4!n9!n1!n",
        new RegExp(
            "^(?<prefix>FO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{9})" +
                "([0-9])" +
            ")$", "g"),
        false
    ),
    FR: new IbanSpecification(
        "FR", 'France',
        27, "FR2!n5!n5!n11!c2!n",
        23, "5!n5!n11!c2!n",
        new RegExp(
            "^(?<prefix>FR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9]{5})" +
                "([0-9a-zA-Z]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        true
        // FIXME: Includes a ton of extra countries
    ),
    GB: new IbanSpecification(
        "GB", 'United Kingdom',
        22, "GB2!n4!a6!n8!n",
        18, "4!a6!n8!n",
        new RegExp(
            "^(?<prefix>GB)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{6})" +
                "([0-9]{8})" +
            ")$", "g"),
        true
        // FIXME: Includes extra countries
    ),
    GE: new IbanSpecification(
        "GE", 'Georgia', 22, "U02F16",
        new RegExp("^GE[0-9]{2}([A-Z]{2})([0-9]{16})$", "g")
    ),
    GI: new IbanSpecification(
        "GI", 'Gibraltar', 23, "U04A15",
        new RegExp("^GI[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{15})$", "g")
    ),
    GL: new IbanSpecification(
        "GL", 'Greenland', 18, "F04F09F01",
        new RegExp("^GL[0-9]{2}([0-9]{4})([0-9]{9})([0-9])$", "g")
    ),
    GR: new IbanSpecification(
        "GR", 'Greece', 27, "F03F04A16",
        new RegExp("^GR[0-9]{2}([0-9]{3})([0-9]{4})([0-9a-zA-Z]{16})$", "g")
    ),
    GT: new IbanSpecification(
        "GT", 'Guatemala', 28, "A04A20",
        new RegExp("^GT[0-9]{2}([0-9a-zA-Z]{4})([0-9a-zA-Z]{20})$", "g")
    ),
    HR: new IbanSpecification(
        "HR", 'Croatia', 21, "F07F10",
        new RegExp("^HR[0-9]{2}([0-9]{7})([0-9]{10})$", "g")
    ),
    HU: new IbanSpecification(
        "HU", 'Hungary', 28, "F03F04F01F15F01",
        new RegExp("^HU[0-9]{2}([0-9]{3})([0-9]{4})([0-9])([0-9]{15})([0-9])$", "g")
    ),
    IE: new IbanSpecification(
        "IE", 'Ireland', 22, "U04F06F08",
        new RegExp("^IE[0-9]{2}([A-Z]{7})([0-9]{6})([0-9]{8})$", "g")
    ),
    IL: new IbanSpecification(
        "IL", 'Israel', 23, "F03F03F13",
        new RegExp("^IL[0-9]{2}([0-9]{3})([0-9]{3})([0-9]{13})$", "g")
    ),
    //IQ: new IbanSpecification("IQ", 'Iraq', 23),
    IS: new IbanSpecification(
        "IS", 'Iceland', 26, "F04F02F06F10",
        new RegExp("^IS[0-9]{2}([0-9]{4})([0-9]{2})([0-9]{6})([0-9]{10})$", "g")
    ),
    IT: new IbanSpecification(
        "IT", 'Italy', 27, "U01F05F05A12",
        new RegExp("^IT[0-9]{2}([A-Z])([0-9]{5})([0-9]{5})([0-9a-zA-Z]{12})$", "g")
    ),
    JO: new IbanSpecification(
        "JO", 'Jordan', 30, "U04F04A18",
        new RegExp("^JO[0-9]{2}([A-Z]{4})([0-9]{4})([0-9a-zA-Z]{18})$", "g")
    ),
    KW: new IbanSpecification(
        "KW", 'Kuwait', 30, "U04A22",
        new RegExp("^KW[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{22})$", "g")
    ),
    KZ: new IbanSpecification(
        "KZ", 'Kazakhstan', 20, "F03A13",
        new RegExp("^KZ[0-9]{2}([0-9]{3})([0-9a-zA-Z]{13})$", "g")
    ),
    LB: new IbanSpecification(
        "LB", 'Lebanon', 28, "F04A20",
        new RegExp("^LB[0-9]{2}([0-9]{4})([0-9a-zA-Z]{20})$", "g")
    ),
    LC: new IbanSpecification(
        "LC", 'Saint Lucia', 32, "U04A24",
        new RegExp("^LC[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{24})$", "g")
    ),
    LI: new IbanSpecification(
        "LI", 'Liechtenstein', 21, "F05A12",
        new RegExp("^LI[0-9]{2}([0-9]{5})([0-9a-zA-Z]{12})$", "g")
    ),
    LT: new IbanSpecification(
        "LT", 'Lithuania', 20, "F05F11",
        new RegExp("^LT[0-9]{2}([0-9]{5})([0-9]{11})$", "g")
    ),
    LU: new IbanSpecification(
        "LU", 'Luxembourg', 20, "F03A13",
        new RegExp("^LU[0-9]{2}([0-9]{3})([0-9a-zA-Z]{13})$", "g")
    ),
    LV: new IbanSpecification(
        "LV", 'Latvia', 21, "U04A13",
        new RegExp("^LV[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{13})$", "g")
    ),
    //LY: new IbanSpecification("LY", 'Libya', 25),
    MC: new IbanSpecification(
        "MC", 'Monaco', 27, "F05F05A11F02",
        new RegExp("^MC[0-9]{2}([0-9]{5})([0-9]{5})([0-9a-zA-Z]{11})([0-9]{2})$", "g")
    ),
    MD: new IbanSpecification(
        "MD", 'Moldova', 24, "A02A18",
        new RegExp("^MD[0-9]{2}([0-9a-zA-Z]{2})([0-9a-zA-Z]{18})$", "g")
    ),
    ME: new IbanSpecification(
        "ME", 'Montenegro', 22, "F03F13F02",
        new RegExp("^ME[0-9]{2}([0-9]{3})([0-9]{13})([0-9]{2})$", "g")
    ),
    MK: new IbanSpecification(
        "MK", 'North Macedonia', 19, "F03A10F02",
        new RegExp("^MK[0-9]{2}([0-9]{3})([0-9a-zA-Z]{10})([0-9]{2})$", "g")
    ),
    MR: new IbanSpecification(
        "MR", 'Mauritania', 27, "F05F05F11F02",
        new RegExp("^MR[0-9]{2}([0-9]{5})([0-9]{5})([0-9]{11})([0-9]{2})$", "g")
    ),
    MT: new IbanSpecification(
        "MT", 'Malta', 31, "U04F05A18",
        new RegExp("^MT[0-9]{2}([A-Z]{4})([0-9]{5})([0-9a-zA-Z]{18})$", "g")
    ),
    MU: new IbanSpecification(
        "MU", 'Mauritius', 30, "U04F02F02F12F03U03",
        new RegExp("^MU[0-9]{2}([A-Z]{4})([0-9]{2})([0-9]{2})([0-9]{12})([0-9]{3})([A-Z]{3})$", "g")
    ),
    NL: new IbanSpecification(
        "NL", 'Netherlands', 18, "U04F10",
        new RegExp("^NL[0-9]{2}([A-Z]{4})([0-9]{10})$", "g")
    ),
    NO: new IbanSpecification(
        "NO", 'Norway', 15, "F04F06F01",
        new RegExp("^NO[0-9]{2}([0-9]{4})([0-9]{6})([0-9])$", "g")
    ),
    PK: new IbanSpecification(
        "PK", 'Pakistan', 24, "U04A16",
        new RegExp("^PK[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{16})$", "g")
    ),
    PL: new IbanSpecification(
        "PL", 'Poland', 28, "F08F16",
        new RegExp("^PL[0-9]{2}([0-9]{8})([0-9]{16})$", "g")
    ),
    PS: new IbanSpecification(
        "PS", 'Palestine', 29, "U04A21",
        new RegExp("^PS\"[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{21})$", "g")
    ),
    PT: new IbanSpecification(
        "PT", 'Portugal', 25, "F04F04F11F02",
        new RegExp("^PT[0-9]{2}([0-9]{4})([0-9]{4})([0-9]{11})([0-9]{2})$", "g")
    ),
    QA: new IbanSpecification(
        "QA", 'Qatar', 29, "U04A21",
        new RegExp("^QA[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{21})$", "g")
    ),
    RO: new IbanSpecification(
        "RO", 'Romania', 24, "U04A16",
        new RegExp("^RO[0-9]{2}([A-Z]{4})([0-9a-zA-Z]{16})$", "g")
    ),
    RS: new IbanSpecification(
        "RS", 'Serbia', 22, "F03F13F02",
        new RegExp("^RS[0-9]{2}([0-9]{3})([0-9]{13})([0-9]{2})$", "g")
    ),
    SA: new IbanSpecification(
        "SA", 'Saudi Arabia', 24, "F02A18",
        new RegExp("^SA[0-9]{2}([0-9]{2})([0-9a-zA-Z]{18})$", "g")
    ),
    SC: new IbanSpecification(
        "SC", 'Seychelles', 31, "U04F02F02F16U03",
        new RegExp("^SC[0-9]{2}([A-Z]{4})([0-9]{2})([0-9]{2})([0-9]{16})([A-Z]{3})$", "g")
    ),
    //SD: new IbanSpecification("SD", 'Sudan', 18),
    SE: new IbanSpecification(
        "SE", 'Sweden', 24, "F03F16F01",
        new RegExp("^SE[0-9]{2}([0-9]{3})([0-9]{16})([0-9])$", "g")
    ),
    SI: new IbanSpecification(
        "SI", 'Slovenia', 19, "F05F08F02",
        new RegExp("^SI[0-9]{2}([0-9]{5})([0-9]{8})([0-9]{2})$", "g")
    ),
    SK: new IbanSpecification(
        "SK", 'Slovakia', 24, "F04F06F10",
        new RegExp("^SK[0-9]{2}([0-9]{4})([0-9]{6})([0-9]{10})$", "g")
    ),
    SM: new IbanSpecification(
        "SM", 'San Marino', 27, "U01F05F05A12",
        new RegExp("^SM[0-9]{2}([A-Z])([0-9]{5})([0-9]{5})([0-9a-zA-Z]{12})$", "g")
    ),
    //SO: new IbanSpecification("SO", 'Somalia', 23),
    ST: new IbanSpecification(
        "ST", 'São Tomé and Príncipe', 25, "F08F11F02",
        new RegExp("^ST[0-9]{2}([0-9]{8})([0-9]{11})([0-9]{2})$", "g")
    ),
    //SV: new IbanSpecification("SV", 'El Salvador', 28),
    TL: new IbanSpecification(
        "TL", 'Timor-Leste', 23, "F03F14F02",
        new RegExp("^TL[0-9]{2}([0-9]{3})([0-9]{14})([0-9]{2})$", "g")
    ),
    TN: new IbanSpecification(
        "TN", 'Tunisia', 24, "F02F03F13F02",
        new RegExp("^TN[0-9]{2}([0-9]{2})([0-9]{3})([0-9]{13})([0-9]{2})$", "g")
    ),
    TR: new IbanSpecification(
        "TR", 'Turkey', 26, "F05A01A16",
        new RegExp("^TR[0-9]{2}([0-9]{5})([0-9a-zA-Z])([0-9a-zA-Z]{16})$", "g")
    ),
    UA: new IbanSpecification(
        "UA", 'Ukraine', 29, "F06A19",
        new RegExp("^UA[0-9]{2}([0-9]{6})([0-9a-zA-Z]{19})$", "g")
    ),
    VA: new IbanSpecification(
        "VA", 'Vatican City State\n',
        22, "VA2!n3!n15!n",
        18, "3!n15!n",
        new RegExp(
            "^(?<prefix>VA)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{3})" +
                "([0-9]{15})" +
            ")$", "g"),
        false
        // FIXME: Has empty data for SEPA !!!
    ),
    VG: new IbanSpecification(
        "VG", 'Virgin Islands',
        24, "VG2!n4!a16!n",
        20, "4!a16!n",
        new RegExp(
            "^(?<prefix>VG)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{16})" +
            ")$", "g"),
        false
    ),
    XK: new IbanSpecification(
        "XK", 'Kosovo',
        20, "XK2!n4!n10!n2!n",
        16, "4!n10!n2!n",
        new RegExp(
            "^(?<prefix>XK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "(?<branchId>[0-9]{2})" +
                "([0-9]{10})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    YE: new IbanSpecification(
        "YE", 'Yemen',
        30, "YE2!n4!a4!n18!c",
        26, "4!a4!n18!c",
        new RegExp(
            "^(?<prefix>YE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9a-zA-Z]{18})" +
            ")$", "g"),
        false
    ),
};

console.log(countriesIbanSpecs);
