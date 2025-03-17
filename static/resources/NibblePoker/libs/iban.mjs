// NibblePoker - IBAN Data
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code, not the data)
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
        "GE", 'Georgia',
        22, "GE2!n2!a16!n",
        18, "2!a16!n",
        new RegExp(
            "^(?<prefix>GE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{2})" +
                "([0-9]{16})" +
            ")$", "g"),
        false
    ),
    GI: new IbanSpecification(
        "GI", 'Gibraltar',
        23, "GI2!n4!a15!c",
        19, "4!a15!c",
        new RegExp(
            "^(?<prefix>GI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{15})" +
            ")$", "g"),
        true
    ),
    GL: new IbanSpecification(
        "GL", 'Greenland',
        18, "GL2!n4!n9!n1!n",
        14, "4!n9!n1!n",
        new RegExp(
            "^(?<prefix>GL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{9})" +
                "([0-9])" +
            ")$", "g"),
        false
    ),
    GR: new IbanSpecification(
        "GR", 'Greece',
        27, "GR2!n3!n4!n16!c",
        23, "3!n4!n16!c",
        new RegExp(
            "^(?<prefix>GR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        true
    ),
    GT: new IbanSpecification(
        "GT", 'Guatemala',
        28, "GT2!n4!c20!c",
        24, "4!c20!c",
        new RegExp(
            "^(?<prefix>GT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9a-zA-Z]{4})" +
                "([0-9a-zA-Z]{20})" +
            ")$", "g"),
        false
    ),
    HN: new IbanSpecification(
        "HN", 'Honduras',
        28, "HN2!n4!a20!n",
        24, "4!a20!n",
        new RegExp(
            "^(?<prefix>HN)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{20})" +
            ")$", "g"),
        false
    ),
    HR: new IbanSpecification(
        "HR", 'Croatia',
        21, "HR2!n7!n10!n",
        17, "7!n10!n",
        new RegExp(
            "^(?<prefix>HR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{7})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    HU: new IbanSpecification(
        "HU", 'Hungary',
        28, "HU2!n3!n4!n1!n15!n1!n",
        24, "3!n4!n1!n15!n1!n",
        new RegExp(
            "^(?<prefix>HU)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9])" +
                "([0-9]{15})" +
                "([0-9])" +
            ")$", "g"),
        true
    ),
    IE: new IbanSpecification(
        "IE", 'Ireland',
        22, "IE2!n4!a6!n8!n",
        18, "4!a6!n8!n",
        new RegExp(
            "^(?<prefix>IE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{6})" +
                "([0-9]{8})" +
            ")$", "g"),
        true
    ),
    IL: new IbanSpecification(
        "IL", 'Israel',
        23, "IL2!n3!n3!n13!n",
        19, "3!n3!n13!n",
        new RegExp(
            "^(?<prefix>IL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{13})" +
            ")$", "g"),
        false
    ),
    IQ: new IbanSpecification(
        "IQ", 'Iraq',
        23, "IQ2!n4!a3!n12!n",
        19, "4!a3!n12!n",
        new RegExp(
            "^(?<prefix>IQ)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{12})" +
            ")$", "g"),
        false
    ),
    IS: new IbanSpecification(
        "IS", 'Iceland',
        26, "IS2!n4!n2!n6!n10!n",
        22, "4!n2!n6!n10!n",
        new RegExp(
            "^(?<prefix>IS)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "(?<branchId>[0-9]{2})" +
                "([0-9]{2})" +
                "([0-9]{6})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    IT: new IbanSpecification(
        "IT", 'Italy',
        27, "IT2!n1!a5!n5!n12!c",
        23, "1!a5!n5!n12!c",
        new RegExp(
            "^(?<prefix>IT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "([A-Z])" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{12})" +
            ")$", "g"),
        true
    ),
    JO: new IbanSpecification(
        "JO", 'Jordan',
        30, "JO2!n4!a4!n18!c",
        26, "4!a4!n18!c",
        new RegExp(
            "^(?<prefix>JO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "([A-Z]{4})" +
                "(?<bankId>[0-9]{4})" +
                "([0-9a-zA-Z]{18})" +
            ")$", "g"),
        false
    ),
    KW: new IbanSpecification(
        "KW", 'Kuwait',
        30, "KW2!n4!a22!c",
        26, "4!a22!c",
        new RegExp(
            "^(?<prefix>KW)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{22})" +
            ")$", "g"),
        false
    ),
    KZ: new IbanSpecification(
        "KZ", 'Kazakhstan',
        20, "KZ2!n3!n13!c",
        16, "3!n13!c",
        new RegExp(
            "^(?<prefix>KZ)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9a-zA-Z]{13})" +
            ")$", "g"),
        false
    ),
    LB: new IbanSpecification(
        "LB", 'Lebanon',
        28, "LB2!n4!n20!c",
        24, "4!n20!c",
        new RegExp(
            "^(?<prefix>LB)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9a-zA-Z]{20})" +
            ")$", "g"),
        false
    ),
    LC: new IbanSpecification(
        "LC", 'Saint Lucia',
        32, "LC2!n4!a24!c",
        28, "4!a24!c",
        new RegExp(
            "^(?<prefix>LC)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{24})" +
            ")$", "g"),
        false
    ),
    LI: new IbanSpecification(
        "LI", 'Liechtenstein',
        21, "LI2!n5!n12!c",
        17, "5!n12!c",
        new RegExp(
            "^(?<prefix>LI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9a-zA-Z]{12})" +
            ")$", "g"),
        true
    ),
    LT: new IbanSpecification(
        "LT", 'Lithuania',
        20, "LT2!n5!n11!n",
        16, "5!n11!n",
        new RegExp(
            "^(?<prefix>LT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9]{11})" +
            ")$", "g"),
        true
    ),
    LU: new IbanSpecification(
        "LU", 'Luxembourg',
        20, "LU2!n3!n13!c",
        16, "3!n13!c",
        new RegExp(
            "^(?<prefix>LU)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9a-zA-Z]{13})" +
            ")$", "g"),
        true
    ),
    LV: new IbanSpecification(
        "LV", 'Latvia',
        21, "LV2!n4!a13!c",
        17, "4!a13!c",
        new RegExp(
            "^(?<prefix>LV)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{13})" +
            ")$", "g"),
        true
    ),
    LY: new IbanSpecification(
        "LY", 'Libya',
        25, "LY2!n3!n3!n15!n",
        21, "3!n3!n15!n",
        new RegExp(
            "^(?<prefix>MC)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{15})" +
            ")$", "g"),
        true
        // FIXME: Has special format
    ),
    MC: new IbanSpecification(
        "MC", 'Monaco',
        27, "MC2!n5!n5!n11!c2!n",
        23, "5!n5!n11!c2!n",
        new RegExp(
            "^(?<prefix>MC)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        true
    ),
    MD: new IbanSpecification(
        "MD", 'Moldova',
        24, "MD2!n2!c18!c",
        20, "2!c18!c",
        new RegExp(
            "^(?<prefix>MD)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9a-zA-Z]{2})" +
                "([0-9a-zA-Z]{18})" +
            ")$", "g"),
        false
    ),
    ME: new IbanSpecification(
        "ME", 'Montenegro',
        22, "ME2!n3!n13!n2!n",
        18, "3!n13!n2!n",
        new RegExp(
            "^(?<prefix>ME)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{13})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    MK: new IbanSpecification(
        "MK", 'Macedonia',
        19, "MK2!n3!n10!c2!n",
        15, "3!n10!c2!n",
        new RegExp(
            "^(?<prefix>MK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9a-zA-Z]{10})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    MN: new IbanSpecification(
        "MN", 'Mongolia',
        20, "MN2!n4!n12!n",
        16, "4!n12!n",
        new RegExp(
            "^(?<prefix>MN)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{12})" +
            ")$", "g"),
        false
    ),
    MR: new IbanSpecification(
        "MR", 'Mauritania',
        27, "MR2!n5!n5!n11!n2!n",
        23, "5!n5!n11!n2!n",
        new RegExp(
            "^(?<prefix>MR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    MT: new IbanSpecification(
        "MT", 'Malta',
        31, "MT2!n4!a5!n18!c",
        27, "4!a5!n18!c",
        new RegExp(
            "^(?<prefix>MT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{18})" +
            ")$", "g"),
        true
    ),
    MU: new IbanSpecification(
        "MU", 'Mauritius',
        30, "MU2!n4!a2!n2!n12!n3!n3!a",
        26, "4!a2!n2!n12!n3!n3!a",
        new RegExp(
            "^(?<prefix>MU)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4}[0-9]{2})" +
                "(?<branchId>[0-9]{2})" +
                "([0-9]{12})" +
                "([0-9]{3})" +
                "([A-Z]{3})" +
            ")$", "g"),
        false
    ),
    NI: new IbanSpecification(
        "NI", 'Nicaragua',
        28, "NI2!n4!a20!n",
        24, "4!a20!n",
        new RegExp(
            "^(?<prefix>NI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{20})" +
            ")$", "g"),
        false
    ),
    NL: new IbanSpecification(
        "NL", 'Netherlands',
        18, "NL2!n4!a10!n",
        14, "4!a10!n",
        new RegExp(
            "^(?<prefix>NL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    NO: new IbanSpecification(
        "NO", 'Norway',
        15, "NO2!n4!n6!n1!n",
        11, "4!n6!n1!n",
        new RegExp(
            "^(?<prefix>NO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{6})" +
                "([0-9])" +
            ")$", "g"),
        true
    ),
    OM: new IbanSpecification(
        "OM", 'Oman',
        23, "OM2!n3!n16!c",
        19, "3!n16!c",
        new RegExp(
            "^(?<prefix>OM)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{3})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        false
    ),
    PK: new IbanSpecification(
        "PK", 'Pakistan',
        24, "PK2!n4!a16!c",
        20, "4!a16!c",
        new RegExp(
            "^(?<prefix>PK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        false
    ),
    PL: new IbanSpecification(
        "PL", 'Poland',
        28, "PL2!n8!n16!n",
        24, "8!n16!n",
        new RegExp(
            "^(?<prefix>PL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<branchId>[0-9]{8})" +
                "([0-9]{16})" +
            ")$", "g"),
        true
    ),
    PS: new IbanSpecification(
        "PS", 'Palestine',
        29, "PS2!n4!a21!c\n",
        25, "4!a21!c",
        new RegExp(
            "^(?<prefix>PS)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{21})" +
            ")$", "g"),
        false
    ),
    PT: new IbanSpecification(
        "PT", 'Portugal',
        25, "PT2!n4!n4!n11!n2!n",
        21, "4!n4!n11!n2!n\n",
        new RegExp(
            "^(?<prefix>PT)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        true
        // FIXME: Includes extra zones
    ),
    QA: new IbanSpecification(
        "QA", 'Qatar',
        29, "QA2!n4!a21!c",
        25, "4!a21!c",
        new RegExp(
            "^(?<prefix>QA)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{21})" +
            ")$", "g"),
        false
    ),
    RO: new IbanSpecification(
        "RO", 'Romania',
        24, "RO2!n4!a16!c",
        20, "4!a16!c",
        new RegExp(
            "^(?<prefix>RO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        true
    ),
    RS: new IbanSpecification(
        "RS", 'Serbia',
        22, "RS2!n3!n13!n2!n",
        18, "3!n13!n2!n",
        new RegExp(
            "^(?<prefix>RS)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{13})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    RU: new IbanSpecification(
        "RU", 'Russia',
        33, "RU2!n9!n5!n15!c",
        29, "9!n5!n15!c",
        new RegExp(
            "^(?<prefix>RU)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{9})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{15})" +
            ")$", "g"),
        false
    ),
    SA: new IbanSpecification(
        "SA", 'Saudi Arabia',
        24, "SA2!n2!n18!c",
        20, "2!n18!c",
        new RegExp(
            "^(?<prefix>SA)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "([0-9a-zA-Z]{18})" +
            ")$", "g"),
        false
    ),
    SC: new IbanSpecification(
        "SC", 'Seychelles',
        31, "SC2!n4!a2!n2!n16!n3!a",
        27, "4!a2!n2!n16!n3!a",
        new RegExp(
            "^(?<prefix>SC)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4}[0-9]{2})" +
                "(?<branchId>[0-9]{2})" +
                "([0-9]{16})" +
                "([A-Z]{3})" +
            ")$", "g"),
        false
    ),
    SD: new IbanSpecification(
        "SD", 'Sudan',
        18, "SD2!n2!n12!n",
        14, "2!n12!n",
        new RegExp(
            "^(?<prefix>SD)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "([0-9]{12})" +
            ")$", "g"),
        false
    ),
    SE: new IbanSpecification(
        "SE", 'Sweden',
        24, "SE2!n3!n16!n1!n",
        20, "3!n16!n1!n",
        new RegExp(
            "^(?<prefix>SE)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{16})" +
                "([0-9])" +
            ")$", "g"),
        true
    ),
    SI: new IbanSpecification(
        "SI", 'Slovenia',
        19, "SI2!n5!n8!n2!n",
        15, "5!n8!n2!n",
        new RegExp(
            "^(?<prefix>SI)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9]{8})" +
                "([0-9]{2})" +
            ")$", "g"),
        true
    ),
    SK: new IbanSpecification(
        "SK", 'Slovakia',
        24, "SK2!n4!n6!n10!n",
        20, "4!n6!n10!n",
        new RegExp(
            "^(?<prefix>SK)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "([0-9]{6})" +
                "([0-9]{10})" +
            ")$", "g"),
        true
    ),
    SM: new IbanSpecification(
        "SM", 'San Marino',
        27, "SM2!n1!a5!n5!n12!c",
        23, "1!a5!n5!n12!c",
        new RegExp(
            "^(?<prefix>SM)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "([A-Z])" +
                "(?<bankId>[0-9]{5})" +
                "(?<branchId>[0-9]{5})" +
                "([0-9a-zA-Z]{12})" +
            ")$", "g"),
        true
    ),
    SO: new IbanSpecification(
        "SO", 'Somalia',
        23, "SO2!n4!n3!n12!n",
        19, "4!n3!n12!n",
        new RegExp(
            "^(?<prefix>SO)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{12})" +
            ")$", "g"),
        false
    ),
    ST: new IbanSpecification(
        "ST", 'Sao Tome and Principe',
        25, "ST2!n4!n4!n11!n2!n",
        21, "8!n11!n2!n",
        new RegExp(
            "^(?<prefix>ST)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{4})" +
                "(?<branchId>[0-9]{4})" +
                "([0-9]{11})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    SV: new IbanSpecification(
        "SV", 'El Salvador',
        28, "SV2!n4!a20!n",
        24, "4!a20!n",
        new RegExp(
            "^(?<prefix>SV)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[A-Z]{4})" +
                "([0-9]{20})" +
            ")$", "g"),
        false
        // FIXME: Special format !!!
    ),
    TL: new IbanSpecification(
        "TL", 'Timor-Leste',
        23, "TL2!n3!n14!n2!n",
        19, "3!n14!n2!n",
        new RegExp(
            "^(?<prefix>TL)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{3})" +
                "([0-9]{14})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    TN: new IbanSpecification(
        "TN", 'Tunisia',
        24, "TN2!n2!n3!n13!n2!n",
        20, "2!n3!n13!n2!n\n",
        new RegExp(
            "^(?<prefix>TN)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{2})" +
                "(?<branchId>[0-9]{3})" +
                "([0-9]{13})" +
                "([0-9]{2})" +
            ")$", "g"),
        false
    ),
    TR: new IbanSpecification(
        "TR", 'Turkey',
        26, "TR2!n5!n1!n16!c",
        22, "5!n1!n16!c",
        new RegExp(
            "^(?<prefix>TR)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{5})" +
                "([0-9a-zA-Z])" +
                "([0-9a-zA-Z]{16})" +
            ")$", "g"),
        false
    ),
    UA: new IbanSpecification(
        "UA", 'Ukraine',
        29, "UA2!n6!n19!c",
        25, "6!n19!c",
        new RegExp(
            "^(?<prefix>UA)" +
            "(?<checksum>[0-9]{2})" +
            "(?<bban>" +
                "(?<bankId>[0-9]{6})" +
                "([0-9a-zA-Z]{19})" +
            ")$", "g"),
        false
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
