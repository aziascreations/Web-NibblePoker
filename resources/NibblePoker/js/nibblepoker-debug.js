const idButtonBorder = "test-toggle-borders";

const classBorderActive = "debug";
const classBorderInactive = "_debug";

function swapDebugClasses() {
	const activeElements = document.querySelectorAll('.' + classBorderActive);
	const inactiveElements = document.querySelectorAll('.' + classBorderInactive);
	
	activeElements.forEach(element => {
		element.classList.remove(classBorderActive);
		element.classList.add(classBorderInactive);
	});
	
	inactiveElements.forEach(element => {
		element.classList.remove(classBorderInactive);
		element.classList.add(classBorderActive);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	// Adding the action to the border button
	const eBorderButton = document.getElementById(idButtonBorder);
	if(eBorderButton !== null) {
		eBorderButton.addEventListener("click", swapDebugClasses);
	}
});
