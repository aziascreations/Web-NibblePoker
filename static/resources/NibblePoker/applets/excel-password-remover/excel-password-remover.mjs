import {initCore} from "../../js/nibblepoker-core.mjs"

const excelFileRegex = /^.*\.xls[xm]$/gi;
const excelWorksheetRegex = /^xl\/worksheets\/.*.xml$/gi;

/**
 * Checks if the given filename appears to be for an Excel file.
 * @param fileName {string} Filename to be checked
 * @returns {boolean} `true` if it appears to be an Excel file, `false` otherwise.
 */
function isExcelExtension(fileName) {
    return fileName.match(excelFileRegex) !== null;
}

// Tool-centric stuff
{
    initCore();

    var outputZip;
    var outputZipFilename = "default-filename.error.zip";
    var filesTotalCount = 0;
    var filesProcessedCount = 0;
    var passwordsRemoved = 0;

    /** @type {string} */
    const appletId = "excel-password-remover";

    /** @type {HTMLElement} */
    const eEulaContainer = document.querySelector(`#${appletId}-eula`);
    ///** @type {HTMLInputElement} */
    //const eEulaDontAskAgainOption = document.querySelector(`input#${appletId}-eula-remember`);
    ///** @type {HTMLButtonElement} */
    //const eEulaAcceptButton = document.querySelector(`button#${appletId}-eula-accept`);

    /** @type {HTMLInputElement} */
    const eFileInput = document.querySelector(`input[type=file]#${appletId}-input-file`);

    /*function acceptTerms() {
        document.getElementById("warning").hidden = true;
        document.getElementById("file-select").hidden = false;
    }*/

    window.onload = function () {

		eFileInput.addEventListener('change', function(e) {
            let fileCount = e.target.files.length;

            console.log(fileCount);
        });

        /*console.log(eEulaContainer);
        console.log(eEulaDontAskAgainOption);
        console.log(eEulaAcceptButton);
        eEulaAcceptButton.addEventListener("click", function() {
            eEulaContainer.hidden = true;
        });*/
    }
}
