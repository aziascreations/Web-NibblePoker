"use strict";
const langKey = document.documentElement.lang.match("(en|fr)") ? document.documentElement.lang : "en";
const langData = {
    en: {
        "alert.textarea.missing.text": "The 'TextArea' element for text is missing !",
        "alert.textarea.missing.b64": "The 'TextArea' element for base64 is missing !",
        "alert.textarea.mismatch.text": "The 'TextArea' element for text isn't declared as a 'TextArea'!",
        "alert.textarea.mismatch.b64": "The 'TextArea' element for base64 isn't declared as a 'TextArea'!",
        "alert.other.missing": "An element is missing from the page !",
        "alert.other.mismatch": "An element is no declared with the proper element type !",
    },
    fr: {
        "alert.textarea.missing.text": "L'élément 'TextArea' pour le texte est introuvable !",
        "alert.textarea.missing.b64": "L'élément 'TextArea' pour les données base64 est introuvable !",
        "alert.textarea.mismatch.text": "L'élément 'TextArea' pour le texte n'est pas un 'TextArea'!",
        "alert.textarea.mismatch.b64": "L'élément 'TextArea' pour les données base64 n'est pas un 'TextArea'!",
        "alert.other.missing": "Un élément de la page est introuvable !",
        "alert.other.mismatch": "Un élément de la page n'est pas bien déclaré !",
    }
};
function localize(stringKey) {
    let _langData = langKey in langData ? langData[langKey] : langData.en;
    return stringKey in _langData ? _langData[stringKey] : (stringKey in langData["en"] ? langData["en"][stringKey] : stringKey);
}
const idPrefix = "tool-b64-tools-";
const eTextTextarea = document.getElementById(idPrefix + "ta-text");
const eBase64Textarea = document.getElementById(idPrefix + "ta-b64");
const eClearAllButton = document.getElementById(idPrefix + "btn-clear-all");
const eClearTextButton = document.getElementById(idPrefix + "btn-clear-text");
const eClearBase64Button = document.getElementById(idPrefix + "btn-clear-b64");
const eConvertTextButton = document.getElementById(idPrefix + "btn-convert-text");
const eConvertBase64Button = document.getElementById(idPrefix + "btn-convert-b64");
const eSelectEncoding = document.getElementById(idPrefix + "encoding");
const eCheckboxPadding = document.getElementById(idPrefix + "checkbox-padding");
if (eTextTextarea == null) {
    alert(localize("alert.textarea.missing.text"));
    throw new Error(localize("alert.textarea.missing.text"));
}
if (eBase64Textarea == null) {
    alert(localize("alert.textarea.missing.b64"));
    throw new Error(localize("alert.textarea.missing.b64"));
}
if (eClearAllButton == null || eClearTextButton == null || eClearBase64Button == null || eConvertTextButton == null ||
    eConvertBase64Button == null || eCheckboxPadding == null || eSelectEncoding == null) {
    alert(localize("alert.other.missing"));
    throw new Error(localize("alert.other.missing"));
}
var TextEncoding;
(function (TextEncoding) {
    TextEncoding[TextEncoding["UTF8"] = 0] = "UTF8";
    TextEncoding[TextEncoding["ASCII"] = 1] = "ASCII";
    TextEncoding[TextEncoding["UNICODE"] = 2] = "UNICODE";
})(TextEncoding || (TextEncoding = {}));
if (!(eTextTextarea instanceof HTMLTextAreaElement)) {
    alert(localize("alert.textarea.mismatch.text"));
    throw new Error(localize("alert.textarea.mismatch.text"));
}
if (!(eBase64Textarea instanceof HTMLTextAreaElement)) {
    alert(localize("alert.textarea.mismatch.b64"));
    throw new Error(localize("alert.textarea.mismatch.b64"));
}
if (!(eCheckboxPadding instanceof HTMLInputElement)) {
    alert(localize("alert.other.mismatch"));
    throw new Error(localize("alert.other.mismatch"));
}
if (!(eSelectEncoding instanceof HTMLSelectElement)) {
    alert(localize("alert.other.mismatch"));
    throw new Error(localize("alert.other.mismatch"));
}
function shouldAddPadding() {
    return eCheckboxPadding.checked;
}
function getTextEncoding() {
    switch (eSelectEncoding.value) {
        case "utf8":
            return TextEncoding.UTF8;
        case "unicode":
            return TextEncoding.UNICODE;
        case "ascii":
            return TextEncoding.ASCII;
        default:
            return TextEncoding.UTF8;
    }
}
function getText() {
    switch (getTextEncoding()) {
        case TextEncoding.UTF8:
            break;
        case TextEncoding.UNICODE:
            return new TextEncoder().encode(eTextTextarea.value);
        case TextEncoding.ASCII:
            break;
    }
    return null;
}
eClearAllButton.addEventListener('click', function handleClick() {
    eTextTextarea.value = "";
    eBase64Textarea.value = "";
});
eClearTextButton.addEventListener('click', function handleClick() {
    eTextTextarea.value = "";
});
eClearBase64Button.addEventListener('click', function handleClick() {
    eBase64Textarea.value = "";
});
eConvertTextButton.addEventListener('click', function handleClick() {
    eBase64Textarea.value = "";
});
eConvertBase64Button.addEventListener('click', function handleClick() {
    eTextTextarea.value = "";
});
//# sourceMappingURL=code.js.map