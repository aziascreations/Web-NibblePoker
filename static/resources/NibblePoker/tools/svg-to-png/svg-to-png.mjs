import {animationStepCount, getBezierBlend, fadeIn, fadeOut} from "../../js/nibblepoker-ui.js";

{
    const animationSpeedMs = 175;

    /** @type {HTMLSelectElement} */
    const eFitOptionSelect = document.querySelector("select#svgtopng-fit-mode");

    const eFileSelectButton = document.querySelector("#svgtopng-add");
    const eFileResetButton = document.querySelector("#svgtopng-reset");

    /** @type {HTMLInputElement} */
    const eFileDropInput = document.querySelector("input[type=file]#pngtoico-drop");

    /** @type {HTMLParagraphElement} */
    const eFileDropTextDrop = document.querySelector("p#pngtoico-drop-text-drop");
    /** @type {HTMLParagraphElement} */
    const eFileDropTextSingle = document.querySelector("p#pngtoico-drop-text-file-single");
    /** @type {HTMLParagraphElement} */
    const eFileDropTextMultiple = document.querySelector("p#pngtoico-drop-text-file-multiple");

    const eExportIndividualButton = document.querySelector("#svgtopng-export-individual");

    /** @type {HTMLElement} */
    const ePreviewContainer = document.querySelector("div#svgtopng-preview-container");

    const ePreviewGenerateButton = document.querySelector("#svgtopng-preview-generate");
    const ePreviewResetButton = document.querySelector("#svgtopng-preview-reset");

    ///** @type {HTMLCanvasElement} */
    //const eConversionCanvas = document.querySelector("canvas#svgtopng-conversion-canvas");

    /**
     * @type {[{
     *  eContainer: Element,
     *  scaleResolution: (function(number, number): [number, number]),
     *  value: string
     *  }]}
     */
    const eFitSubOptions = [
        {
            value: "fit-svg",
            eContainer: document.querySelector("div#svgtopng-options-fit-svg"),
            scaleResolution: (originalWidth, originalHeight) => {
                return [originalWidth, originalHeight];
            }
        },
        {
            value: "fit-fixed",
            eContainer: document.querySelector("div#svgtopng-options-fit-fixed"),
            scaleResolution: (originalWidth, originalHeight) => {
                return [
                    parseInt(document.getElementById("fixed-size-width").value),
                    parseInt(document.getElementById("fixed-size-height").value),
                ];
            }
        },
        {
            value: "fit-bigger-than",
            eContainer: document.querySelector("div#svgtopng-options-fit-bigger-than"),
            scaleResolution: (originalWidth, originalHeight) => {
                return [0, 0];
            }
        },
        {
            value: "fit-smaller-than",
            eContainer: document.querySelector("div#svgtopng-options-fit-smaller-than"),
            scaleResolution: (originalWidth, originalHeight) => {
                return [0, 0];
            }
        },
    ]

    let currentFitOption = eFitSubOptions.find(fitSubOption => fitSubOption.value === eFitOptionSelect.value);

    const rawUserImageData = [];

    function updateFileDropText() {
        eFileDropTextDrop.hidden = true;
        eFileDropTextSingle.hidden = true;
        eFileDropTextMultiple.hidden = true;

        if(rawUserImageData.length === 0) {
            eFileDropTextDrop.hidden = false;
        } else if(rawUserImageData.length === 1) {
            eFileDropTextSingle.hidden = false;
        } else {
            eFileDropTextMultiple.hidden = false;
            eFileDropTextMultiple.querySelector("span").innerText = rawUserImageData.length;
        }
    }

    /**
     * Loads a given image in memory for it to be displayed and processed later on.
     * @param {File} imageFile
     */
    function loadImage(imageFile) {
        //console.log("Loading: " + imageFile.name);

        let fileReader = new FileReader();

        fileReader.onload = function(e) {
            let eImage = document.createElement("img");
            eImage.src = e.target.result;
            processNewImage(eImage)
        };

        fileReader.readAsDataURL(imageFile);
    }

    /**
     * Adds a given image to the internal list and the DOM.
     * @param {HTMLImageElement} eRawImage
     */
    function processNewImage(eRawImage) {
        rawUserImageData.push(eRawImage);
        //addImagePreview(eRawImage);
        //console.log(rawUserImageData);
        updateFileDropText();
    }

    /**
     * Adds a given image to the DOM as a resized preview.
     * @param {HTMLImageElement} eRawImage
     */
    function addImagePreview(eRawImage) {
        let ePreviewImage = document.createElement("img");
        ePreviewImage.src = eRawImage.src;
        //ePreviewImage.style.maxWidth = "256px";
        //ePreviewImage.style.maxHeight = "256px";
        ePreviewImage.classList.add("mb-s");
        ePreviewImage.classList.add("d-inline-block");
        ePreviewImage.classList.add("border");
        ePreviewContainer.appendChild(ePreviewImage);
    }

    function convertAndDownload() {
		if(rawUserImageData.length === 0) {
			console.error("No files selected !");
			return
		}

        rawUserImageData.forEach((eRawImage, iRawImage) => {
			console.log("Handling: " + eRawImage);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const finalResolution = currentFitOption.scaleResolution(eRawImage.width, eRawImage.height);
            canvas.width = finalResolution[0];
            canvas.height = finalResolution[1];

			ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(eRawImage, 0, 0, canvas.width, canvas.height);

            // Convert each image to PNG and trigger download
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = eRawImage.name.replace(".svg", ".png");
                link.click();
            });
        });
    }

    window.onload = function () {
        // Checking if all fit sub-options are valid
        const fitSubOptionsValues = Array.from(eFitOptionSelect.options).map(option => option.value);
        eFitSubOptions.forEach(fitSubOption => {
            if (!fitSubOptionsValues.includes(fitSubOption.value)) {
                alert("ERROR: Cannot find option for '" + fitSubOption.value + "' fit !");
                throw new Error("Cannot find option for '" + fitSubOption.value + "' fit !");
            }
            if (fitSubOption.eContainer === null) {
                alert("ERROR: Cannot find fit sub-options element for '" + fitSubOption.value + "' !");
                throw new Error("Cannot find fit sub-options element for '" + fitSubOption.value + "' !");
            }
        })

        eFitOptionSelect.addEventListener('change', function () {
            // FIXME: Disable export buttons
            fadeOut(currentFitOption.eContainer, animationSpeedMs).then(r => {
                currentFitOption = eFitSubOptions.find(fitSubOption => fitSubOption.value === eFitOptionSelect.value);
                fadeIn(currentFitOption.eContainer, animationSpeedMs).then(r => {});
            });
        });


        eFileSelectButton.addEventListener("click", function() {
            eFileDropInput.click();
        });
        eFileResetButton.addEventListener("click", function() {
            while(rawUserImageData.length > 0){
                rawUserImageData.pop();
            }
            ePreviewResetButton.click();
            updateFileDropText();
        });
        eFileDropInput.onchange = function(event) {
            let files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                //console.log(files[i]);
                loadImage(files[i]);
            }
        };

        eExportIndividualButton.addEventListener("click", function() {
            convertAndDownload();
        });

        ePreviewGenerateButton.addEventListener("click", function() {
            rawUserImageData.forEach(eRawImage => {
                addImagePreview(eRawImage);
            })
        });
        ePreviewResetButton.addEventListener("click", function() {
            while(ePreviewContainer.firstChild) {
                ePreviewContainer.removeChild(ePreviewContainer.lastChild);
            }
        });
    };
}
