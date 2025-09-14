// NibblePoker - Core Scripts
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)
// Remark:
//  * This module contains all the scripts that are globally required on this website

export let isSidebarVisible = true;

export function initCore() {
    const eSidebarToggleButton = document.getElementById("sidebar-toggle-footer");
    const eSidebar = document.getElementById("sidebar");
	const eMain = document.getElementById("main");

	// TODO: Emit an event to help Splide re-align after the sidebar has changed state.

	if(eSidebarToggleButton !== null && eSidebar !== null && eMain !== null) {
		eSidebarToggleButton.onclick = function() {
			if(isSidebarVisible) {
				eSidebar.classList.add("retracted");
				eMain.classList.add("expanded");
			} else {
				eSidebar.classList.remove("retracted");
				eMain.classList.remove("expanded");
			}
			isSidebarVisible = !isSidebarVisible;
		};
	}

	//showContentModal(eContentModal);

	// FIXME: Fix the modals, this is hindering many things !
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
	document.querySelectorAll(".np-file-input-drop-container").forEach(eRootContainer => {

    	/** @type {HTMLInputElement} */
		const eFileDropInput = eRootContainer.querySelector("input[type=file]");
		if(eFileDropInput == null) {
			return;
		}

    	/** @type {string} */
		const inputId = eFileDropInput.getAttribute("id");

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

        function handleFileDropClear() {
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
        }

		if(eFileDropAddButton !== null) {
			eFileDropAddButton.addEventListener("click", function() {
                handleFileDropClear();
				eFileDropInput.click();
			});
		}

		if(eFileDropClearButton !== null) {
			eFileDropClearButton.addEventListener("click", function() {
				handleFileDropClear();
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
}
