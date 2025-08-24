
import {initCore} from "../../js/nibblepoker-core.mjs"
import {parsePngFile} from "../../libs/png-utils.mjs";
import {parseBmpFile} from "../../libs/bmp-utils.mjs";

{
    initCore();

    const toolId = "png-analyser";

    const eFileInput = document.getElementById(`${toolId}-test-input`);

    window.onload = function () {

		eFileInput.addEventListener('change', function(e) {
            let files = e.target.files;

            console.log(files);

            if(files[0].name.endsWith(".png")) {
                parsePngFile(files[0]).then(pngFile => {
                    console.log(pngFile);
                    console.log(pngFile.getImageHeaderChunk().getWidth());
                    console.log(pngFile.getImageHeaderChunk().getHeight());
                });
            } else if(files[0].name.endsWith(".bmp")) {
                parseBmpFile(files[0]).then(bmpFile => {
                    console.log(bmpFile);
                });
            }

        });
    };
}
