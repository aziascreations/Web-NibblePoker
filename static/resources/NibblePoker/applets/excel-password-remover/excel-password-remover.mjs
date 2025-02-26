const excelFileRegex = /^.*\.xls[xm]$/gi;
const excelWorksheetRegex = /^xl\/worksheets\/.*.xml$/gi;

var outputZip;
var outputZipFilename = "default-filename.error.zip";
var filesTotalCount = 0;
var filesProcessedCount = 0;
var passwordsRemoved = 0;

// Tool-centric stuff
{
    /** @type {string} */
    const appletId = "excel-password-remover";

    ///** @type {HTMLElement} */
    //const eEulaContainer = document.querySelector(`#${appletId}-eula`);
    ///** @type {HTMLInputElement} */
    //const eEulaDontAskAgainOption = document.querySelector(`input#${appletId}-eula-remember`);
    ///** @type {HTMLButtonElement} */
    //const eEulaAcceptButton = document.querySelector(`button#${appletId}-eula-accept`);

    /*function acceptTerms() {
        document.getElementById("warning").hidden = true;
        document.getElementById("file-select").hidden = false;
    }*/

    window.onload = function () {
        /*console.log(eEulaContainer);
        console.log(eEulaDontAskAgainOption);
        console.log(eEulaAcceptButton);
        eEulaAcceptButton.addEventListener("click", function() {
            eEulaContainer.hidden = true;
        });*/
    }
}
