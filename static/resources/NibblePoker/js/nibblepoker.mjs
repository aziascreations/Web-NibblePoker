// NibblePoker - Mandatory Scripts
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)
// Remark: This modules contains all the scripts that are globally required on this website

import {fadeIn} from "./nibblepoker-ui"

/*class CpuArchitecture {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

const CpuArchitectures = {
	Unknown: new CpuArchitecture(0, "?"),
	x86: new CpuArchitecture(1, "x86"),
	x64: new CpuArchitecture(2, "x64"),
	ArmGeneric: new CpuArchitecture(3, "ARM"),
	Arm64: new CpuArchitecture(4, "ARM64"),
	RiscV: new CpuArchitecture(5, "RISC-V"),
}

function getCpuArchitecture(userAgent = navigator.userAgent) {
	if(userAgent.includes("x64")) {
		return CpuArchitectures.x64;
	} else if(userAgent.includes("x86")) {
		return CpuArchitectures.x86;
	} else if(userAgent.includes("ARM")) {
		return CpuArchitectures.ArmGeneric;
	} else if(userAgent.includes("ARM64")) {
		return CpuArchitectures.Arm64;
	} else if(userAgent.includes("RISC-V")) {
		return CpuArchitectures.RiscV;
	}
	return CpuArchitectures.Unknown;
}*/

let isSidebarVisible = true;
let eContentModal = document.getElementById("modal-content");
let eContentModalInner = document.getElementById("modal-content-inner");

function showContentModal(eContent) {
	eContentModalInner.appendChild(eContent);
	fadeIn(eContentModal, 175).then(r => {
		// We don't care about what happens afterward...
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const eSidebar = document.getElementById("sidebar");
	const eMain = document.getElementById("main");

	// TODO: Emit an event to help Splide re-align after the sidebar has changed state.
	document.getElementById("sidebar-toggle-footer").onclick = function() {
		if(isSidebarVisible) {
			eSidebar.classList.add("retracted");
			eMain.classList.add("expanded");
		} else {
			eSidebar.classList.remove("retracted");
			eMain.classList.remove("expanded");
		}
		isSidebarVisible = !isSidebarVisible;
	};

	//showContentModal(eContentModal);

	// FIXME: Fix this shit !
	//[eContentModal, document.getElementById("modal-content-cross"), eContentModalInner].forEach(value => {
	//	value.onclick = function() {
	//		fadeOut(eContentModal, 175).then(r => {
	//			eContentModalInner.innerHTML = "";
	//		});
	//	}
	//})

	// TODO: Autodetect mobile screens, close it, and add classes to make it over the rest with dark modal bkgd.

	// Printing the detected CPU architecture
	/*const detectedCpuArch= getCpuArchitecture();
	let cpuArchPrintouts = document.querySelectorAll(".data-cpu-arch");
	cpuArchPrintouts.forEach(element => {
		element.textContent = detectedCpuArch.name;
	});*/

	// Setting up the file drop inputs
	document.querySelectorAll(".np-file-input-root-container").forEach(eRootContainer => {
		//console.log(eRootContainer);

    	/** @type {HTMLInputElement} */
		const eFileDropInput = eRootContainer.querySelector("input[type=file]");
		if(eFileDropInput == null) {
			return;
		}

    	/** @type {string} */
		const inputId = eFileDropInput.getAttribute("id");
		//console.log(inputId);

    	/** @type {HTMLElement} */
		const eFileDropTextEmpty = eRootContainer.querySelector(`#${inputId}-text-drop`);

    	/** @type {HTMLElement} */
		const eFileDropTextSingle = eRootContainer.querySelector(`#${inputId}-text-file-single`);

    	/** @type {HTMLElement} */
		const eFileDropTextMultiple = eRootContainer.querySelector(`#${inputId}-text-file-multiple`);

    	/** @type {HTMLButtonElement} */
		const eFileDropAddButton = eRootContainer.querySelector(`button#${inputId}-add`);

    	/** @type {HTMLButtonElement} */
		const eFileDropClearButton = eRootContainer.querySelector(`button#${inputId}-reset`);

    	/** @type {NodeListOf<HTMLElement>} */
		const eFileDropSelectionCounts = eRootContainer.querySelectorAll(`.np-file-drop-count`);

		if(eFileDropAddButton !== null) {
			eFileDropAddButton.addEventListener("click", function() {
				eFileDropInput.click();
			});
		}

		if(eFileDropClearButton !== null) {
			eFileDropClearButton.addEventListener("click", function() {
				eFileDropInput.value = '';
				if(eFileDropTextSingle !== null) {
					eFileDropTextSingle.hidden = true;
				}
				if(eFileDropTextMultiple !== null) {
					eFileDropTextMultiple.hidden = true;
				}
				if(eFileDropTextEmpty !== null) {
					eFileDropTextEmpty.hidden = false;
				}
			});
		}

		eFileDropInput.addEventListener('change', function(e) {
			let fileCount = e.target.files.length;

			if(fileCount === 1 && eFileDropTextSingle !== null) {
				if(eFileDropTextEmpty !== null) {
					eFileDropTextEmpty.hidden = true;
				}
				if(eFileDropTextMultiple !== null) {
					eFileDropTextMultiple.hidden = true;
				}
				eFileDropTextSingle.hidden = false;
			}

			if(fileCount >= 1 && eFileDropTextMultiple !== null) {
				if(eFileDropTextEmpty !== null) {
					eFileDropTextEmpty.hidden = true;
				}
				if(eFileDropTextSingle !== null) {
					eFileDropTextSingle.hidden = true;
				}

				eFileDropSelectionCounts.forEach(eFileDropSelectionCount => {
					eFileDropSelectionCount.innerText = `${fileCount}`;
				});

				eFileDropTextMultiple.hidden = false;
			}
		});
	});
});
