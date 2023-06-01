const animationStepCount = 10;

function getBezierBlend(progress) {
	return (3 * progress ** 2) - (2 * progress ** 3);
}

function fadeOut(element, time = 200) {
	element.style.opacity = "1.0";
	element.hidden = false;
	return new Promise((resolve) => {
		const delay = time / animationStepCount;
		let i = 0;
		const intervalId = setInterval(() => {
			element.style.opacity = String(1 - getBezierBlend(i / animationStepCount));
			i++;
			if(i === animationStepCount) {
				element.style.opacity = "0.0";
				element.hidden = true;
				clearInterval(intervalId);
				resolve();
			}
		}, delay);
	});
}

function fadeIn(element, time = 200) {
	element.style.opacity = "0.0";
	element.hidden = false;
	return new Promise((resolve) => {
		const delay = time / animationStepCount;
		let i = 0;
		const intervalId = setInterval(() => {
			element.style.opacity = String(getBezierBlend(i / animationStepCount));
			i++;
			if(i === animationStepCount) {
				element.style.opacity = "1.0";
				clearInterval(intervalId);
				resolve();
			}
		}, delay);
	});
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
	
	[eContentModal, document.getElementById("modal-content-cross"), eContentModalInner].forEach(value => {
		value.onclick = function() {
			fadeOut(eContentModal, 175).then(r => {
				eContentModalInner.innerHTML = "";
			});
		}
	})
	
	// TODO: Autodetect mobile screens, close it, and add classes to make it over the rest with dark modal bkgd.
});
