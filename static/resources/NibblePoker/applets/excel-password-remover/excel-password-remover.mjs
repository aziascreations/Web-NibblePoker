// Implied Globals: JSZip
if(JSZip == null) {
    alert("JSZip isn't available !");
}

import {initCore} from "../../js/nibblepoker-core.mjs"
import {cloneTemplate} from "../../js/nibblepoker-template.mjs"

export const excelFileRegex = /^.*\.xls[xm]$/gi;
export const excelWorksheetRegex = /^xl\/worksheets\/.*.xml$/gi;

/**
 * Checks if the given filename appears to be for an Excel file.
 * @param fileName {string} Filename to be checked
 * @returns {boolean} `true` if it appears to be an Excel file, `false` otherwise.
 */
export function isExcelExtension(fileName) {
    return fileName.match(excelFileRegex) !== null;
}

// Tool-centric stuff
{
    initCore();

    //let outputZip;
    //let outputZipFilename = "default-filename.error.zip";
    //let filesTotalCount = 0;
    //let filesProcessedCount = 0;
    //let passwordsRemoved = 0;

    /** @type {string} */
    const appletId = "excel-password-remover";

    /** @type {HTMLInputElement} */
    const eFileInput = document.querySelector(`input[type=file]#${appletId}-input-file`);
    /** @type {HTMLButtonElement} */
    const eFileInputClearButton = document.querySelector(`button#${appletId}-input-file-reset`);

    /** @type {HTMLElement} */
    const eResultEmptyText = document.querySelector(`#${appletId}-details-empty`);
    /** @type {HTMLElement} */
    const eResultPopulatedText = document.querySelector(`#${appletId}-details-populated`);

    /** @type {HTMLElement} */
    const eResultContainer = document.querySelector(`#${appletId}-result-container`);

    /** @type {HTMLTemplateElement} */
    const eSuccessTemplate = document.querySelector(`template#tmpl-success-root`);
    /** @type {HTMLTemplateElement} */
    const eWarningTemplate = document.querySelector(`template#tmpl-warning-root`);
    /** @type {HTMLTemplateElement} */
    const eErrorTemplate = document.querySelector(`template#tmpl-error-root`);

    /** @type {HTMLButtonElement} */
    const eFileDownloadAllButton = document.querySelector(`button#${appletId}-files-download-all`);
    /** @type {HTMLButtonElement} */
    const eFileClearButton = document.querySelector(`button#${appletId}-files-clear`);

    class ExcelFileData {
        /** @type {File} */
        originalFile;

        /** @type {any} */
        processedZipFile;

        filesTotalCount = 0;
        filesProcessedCount = 0;
        passwordsRemoved = 0;

        constructor(originalFile) {
            this.originalFile = originalFile;
        }

        /** @returns {string} */
        getOutputName() {
			let outputZipExtension = "." + this.originalFile.name.split(".").pop();
			let outputZipFilename = this.originalFile.name.substring(0, this.originalFile.name.length - outputZipExtension.length);
			return outputZipFilename + "_no-password" + outputZipExtension;
        }
    }

    /** @type {ExcelFileData[]} */
    let rawWorksheetFiles = [];

    function onFileAddedToDom() {
        eResultEmptyText.hidden = true;
        eResultPopulatedText.hidden = false;
    }

    function onFilesRemovedFromDom() {
        eResultEmptyText.hidden = false;
        eResultPopulatedText.hidden = true;
    }

    /**
     * @param excelFile {ExcelFileData}
     */
    function onFileHavingPasswordRemoved(excelFile) {
        console.debug(`Removed ${excelFile.passwordsRemoved} password(s) from '${excelFile.originalFile.name}'`);

        cloneTemplate(
                eSuccessTemplate,
                {
                    "tmpl-success-filename": excelFile.originalFile.name,
                    "tmpl-success-password-count": excelFile.passwordsRemoved
                },
                true
            ).then(eFragment => {
                console.debug(eFragment);

                // Doesn't work on BS4 and RAW, it returns " "...
                //const eFileOutput = eFragment.firstChild;

                const eFileOutput = eFragment.querySelector("*");
                eFileOutput.addEventListener("click", function() {
                    console.debug(123);
                    //processedZipFile
                    downloadProcessedFile(excelFile);
                });
                console.debug(eFileOutput);
                eResultContainer.appendChild(eFileOutput);

                //const uuid = crypto.randomUUID();
                //console.debug(eFragment.firstChild);
                //eFragment.firstChild.id = uuid;
                //eResultContainer.appendChild(eFragment);

                onFileAddedToDom();
            });
    }

    /**
     * @param excelFile {ExcelFileData}
     */
    function onFileWithoutPasswords(excelFile) {
        console.warn(`No password(s) were found in ${excelFile.originalFile.name} !`);

        cloneTemplate(
                eWarningTemplate,
                {
                    "tmpl-warning-filename": excelFile.originalFile.name,
                    "tmpl-warning-message-extension": "",
                    //"tmpl-warning-message-no-password": "",
                },
                true
            ).then(eFragment => {
                console.debug(eFragment);
                eResultContainer.appendChild(eFragment);
                onFileAddedToDom();
            });
    }

    /**
     * @param excelFile {ExcelFileData}
     */
    function onFileWithInvalidExtension(excelFile) {
        console.warn(`The given file '${excelFile.originalFile.name}' doesn't have an Excel extension`);

        cloneTemplate(
                eWarningTemplate,
                {
                    "tmpl-warning-filename": excelFile.originalFile.name,
                    //"tmpl-warning-message-extension": "",
                    "tmpl-warning-message-no-password": "",
                },
                true
            ).then(eFragment => {
                console.debug(eFragment);
                eResultContainer.appendChild(eFragment);
                onFileAddedToDom();
            });
    }

    /**
     * @param excelFile {ExcelFileData}
     * @param error {any}
     */
    function onExtractionFailure(excelFile, error) {
        console.error("Failed to extract the content of the file in the browser ! ("+error.message+")");

        cloneTemplate(
                eErrorTemplate,
                {
                    "tmpl-error-filename": excelFile.originalFile.name,
                    //"tmpl-error-message-jszip": ""
                },
                true
            ).then(eFragment => {
                console.debug(eFragment);
                eResultContainer.appendChild(eFragment);
                onFileAddedToDom();
            });
    }

    /**
     * @param excelFile {ExcelFileData}
     */
    function downloadProcessedFile(excelFile) {
        excelFile.processedZipFile.generateAsync({type:"base64"}).then(function(b64Data) {
            const eLink = document.createElement('a');
            eLink.download = excelFile.getOutputName();
            //console.debug(b64Data);
            eLink.href = 'data:application/zip;base64,' + b64Data;
            eLink.click();
        }, function(err) {
            console.error(err);
            //handleError("An error has occured while generating your file, please check the console for more info !");
        });
    }

    window.onload = function () {
        eFileDownloadAllButton.addEventListener("click", function() {
            eResultContainer.childNodes.forEach(eResultLine => {
                //console.debug(eResultLine);
                eResultLine.click();
            })
        });

        eFileClearButton.addEventListener("click", function() {
            while (eResultContainer.firstChild) {
                eResultContainer.firstChild.remove();
            }
            onFilesRemovedFromDom();
            rawWorksheetFiles = [];
            eFileInputClearButton.click();
        });

		eFileInput.addEventListener('change', function(e) {
            rawWorksheetFiles = [];

            for (let i = 0; i < e.target.files.length; i++) {
                console.debug(e.target.files[i]);
                rawWorksheetFiles.push(new ExcelFileData(e.target.files[i]));
            }

            rawWorksheetFiles.forEach(excelFile => {
                if(!isExcelExtension(excelFile.originalFile.name)) {
                    onFileWithInvalidExtension(excelFile);
                    return;
				}

                JSZip.loadAsync(excelFile.originalFile).then(function(zip) {
                    console.group(`JSZip - ${excelFile.originalFile.name}`);

                    excelFile.processedZipFile = new JSZip();
                    excelFile.filesTotalCount = 0;
                    excelFile.filesProcessedCount = 0;
                    excelFile.passwordsRemoved = 0;

                    for(const[fileKey, fileValue] of Object.entries(zip.files)) {
                        excelFile.filesTotalCount++;

                        if(fileKey.match(excelWorksheetRegex)) {
                            console.debug("Checking: "+fileKey);

                            fileValue.async("string").then(function(fileText) {
                                console.group(`JSZip - ${excelFile.originalFile.name} - ${fileKey}`);

                                let startIndex = fileText.indexOf('<sheetProtection ');

                                if(startIndex === -1) {
                                    // No password found.
                                    excelFile.processedZipFile.file(fileKey, fileText);
                                    console.debug("Analysed: "+fileKey);
                                } else {
                                    // Removing the password.
                                    let endIndex = fileText.indexOf('/>', startIndex) + 2;
                                    fileText = fileText.replace(fileText.substr(startIndex, endIndex-startIndex), "");
                                    excelFile.processedZipFile.file(fileKey, fileText);
                                    console.debug("Processed: "+fileKey);
                                    excelFile.passwordsRemoved++;
                                }

                                excelFile.filesProcessedCount++;

                                console.groupEnd();
                            });
                        } else {
                            // Other files.
                            console.debug("Ignoring: "+fileKey);
                            fileValue.async("string").then(function(fileText) {
                                console.group(`JSZip - ${excelFile.originalFile.name} - ${fileKey}`);
                                console.debug(`Copying as-is`);

                                excelFile.processedZipFile.file(fileKey, fileText);
                                excelFile.filesProcessedCount++;

                                console.groupEnd();
                            });
                        }
                    }

                    console.debug("Waiting for all the files to be processed !");

                    function waitFilesBeingProcessed() {
                        console.debug("Processed "+excelFile.filesProcessedCount+" file(s) out of "+excelFile.filesTotalCount);

                        if(excelFile.filesTotalCount !== excelFile.filesProcessedCount) {
                            setTimeout(waitFilesBeingProcessed, 50);
                        } else {
                            console.debug("Done !");
                            if(excelFile.passwordsRemoved > 0) {
                                onFileHavingPasswordRemoved(excelFile);
                            } else {
                                onFileWithoutPasswords(excelFile);
                            }
                        }
                    }

                    setTimeout(waitFilesBeingProcessed, 50);

                    console.groupEnd();
                }, function (e) {
                    onExtractionFailure(excelFile, e);
                });
            });

        });
    }
}
