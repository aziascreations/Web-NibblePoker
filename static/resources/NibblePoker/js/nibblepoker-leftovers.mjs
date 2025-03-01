// NibblePoker - Leftovers
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

import {fadeIn} from "./nibblepoker-ui"

//export cloneTemplate;

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

let eContentModal = document.getElementById("modal-content");
let eContentModalInner = document.getElementById("modal-content-inner");

function showContentModal(eContent) {
	eContentModalInner.appendChild(eContent);
	fadeIn(eContentModal, 175).then(r => {
		// We don't care about what happens afterward...
	});
}
