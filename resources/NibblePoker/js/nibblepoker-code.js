// Highlights the code blocks when included on a page.
// This command is separated in its own file since highlight.js isn't on every page and because I can't use JS
//   in a script element without using an external .js file.

Array.from(document.getElementsByClassName("code")).forEach(eCodeContainer => {
	let language = null;
	
	eCodeContainer.classList.forEach(cCodeContainer => {
		if(cCodeContainer.startsWith("language-")) {
			language = cCodeContainer;
		}
	});
	
	if(language !== null) {
		Array.from(eCodeContainer.children).forEach(eCodeLine => {
			if(eCodeLine.classList.contains("code-line")) {
				eCodeLine.classList.add(language);
				hljs.highlightElement(eCodeLine);
			}
		});
	}
});

// Adding the action to copy the code to elements with the "js-code-copy" class.
// The search works by searching the closest parent with the "code" class or that is a "code" element, and then
//   reading each of its children with the "code-line" class.

Array.from(document.getElementsByClassName("js-code-copy")).forEach(eCodeCopyButton => {
	let eParentCodeBlock = eCodeCopyButton;
	
	while(eParentCodeBlock != null &&!eParentCodeBlock.classList.contains("code") &&
	eParentCodeBlock.nodeName.toLowerCase() !== "code") {
		eParentCodeBlock = eParentCodeBlock.parentElement;
	}
	
	if(eParentCodeBlock != null) {
		let code = "";
		
		Array.from(eParentCodeBlock.children).forEach(eCodeLine => {
			if(eCodeLine.classList.contains("code-line")) {
				code += eCodeLine.textContent + "\n"
			}
		});
		
		eCodeCopyButton.onclick = function() {
			navigator.clipboard.writeText(code);
		};
	}
});
