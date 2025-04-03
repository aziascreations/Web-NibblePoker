
import {initCore} from "../../js/nibblepoker-core.mjs"
import {parsePngFile} from "../../libs/png-utils.mjs";

{
    initCore();

    const toolId = "png-analyser";

    const eFileInput = document.getElementById(`${toolId}-test-input`);

    window.onload = function () {

		eFileInput.addEventListener('change', function(e) {
            let files = e.target.files;

            console.log(files);

            parsePngFile(files[0]).then(pngFile => {
                console.log(pngFile);

                console.log(pngFile.getImageHeaderChunk().getWidth());
                console.log(pngFile.getImageHeaderChunk().getHeight());
            });
        });
    };
}
