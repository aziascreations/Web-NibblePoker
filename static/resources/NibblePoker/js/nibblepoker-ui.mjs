// NibblePoker - UI Scripts
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

export const animationStepCount = 10;

export function getBezierBlend(progress) {
	return (3 * progress ** 2) - (2 * progress ** 3);
}

export function fadeOut(element, time = 200) {
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

export function fadeIn(element, time = 200) {
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
