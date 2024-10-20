import {fadeIn} from "./nibblepoker-ui"

class CpuArchitecture {
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
}

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
	const detectedCpuArch= getCpuArchitecture();
	let cpuArchPrintouts = document.querySelectorAll(".data-cpu-arch");
	cpuArchPrintouts.forEach(element => {
		element.textContent = detectedCpuArch.name;
	});
});
