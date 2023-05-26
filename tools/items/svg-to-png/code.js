
document.addEventListener("DOMContentLoaded", () => {
	const eInputFiles = document.getElementById("tool-svg-to-png-files");
	const eFileSelectButton = document.getElementById("tool-svg-to-png-btn-select");
	
	const eTextNoFiles = document.getElementById("tool-svg-to-png-text-none");
	const eTextHasFiles = document.getElementById("tool-svg-to-png-text-good");
	const eTextFileCount = document.getElementById("tool-svg-to-png-file-count");
	
	const eInputWidth = document.getElementById("tool-svg-to-png-width");
	const eInputHeight = document.getElementById("tool-svg-to-png-height");
	
	const eFileConvertButton = document.getElementById("tool-svg-to-png-btn-convert");
	
	// Propagating the button click to the input element
	eFileSelectButton.onclick = function () {
		eInputFiles.click();
	}
	
	// Handling file selection
	eInputFiles.addEventListener('change', function(e) {
		eTextNoFiles.hidden = true;
		eTextHasFiles.hidden = true;
		eTextFileCount.innerText = e.target.files.length.toString();
		if(e.target.files.length > 0) {
			eTextHasFiles.hidden = false;
		} else {
			eTextNoFiles.hidden = false;
		}
	});
	
	// Handling conversion
	eFileConvertButton.onclick = function () {
		const canvas = document.getElementById('conversion-canvas');
		const ctx = canvas.getContext('2d');
		
		if(eInputFiles.files.length === 0) {
			console.error("No files selected !");
			return
		}
		
		canvas.width = parseInt(eInputWidth.value);
		canvas.height = parseInt(eInputHeight.value);
		
		for(let iFile = 0; iFile < eInputFiles.files.length; iFile++) {
			const imageFile = eInputFiles.files[iFile];
			const fileReader = new FileReader();
			
			console.log("Handling: " + imageFile.name);
			
			fileReader.onload = (function(file) {
				return function(e) {
					const image = new Image();
					image.onload = function() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
						const dataURL = canvas.toDataURL('image/png');
						const link = document.createElement('a');
						link.download = imageFile.name.replace(".svg", ".png");
						link.href = dataURL;
						link.click();
					};
					image.src = e.target.result; // Set the image source
				};
			})(imageFile);
			
			fileReader.readAsDataURL(imageFile);
		}
	}
});
