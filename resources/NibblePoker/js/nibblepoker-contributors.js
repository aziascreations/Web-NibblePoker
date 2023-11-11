const rootSoundDirectory = "/resources/NibblePoker/sounds/"

const kittySoundData = {
	"kitty-kiki" : [
		"meow-test-01.ogg",
	],
	"kitty-maki" : [
		"meow-test-02.ogg",
	],
}

document.addEventListener("DOMContentLoaded", () => {
	for (const [eId, sounds] of Object.entries(kittySoundData)) {
		const eHovered = document.getElementById(eId);
		
		if(eHovered !== null) {
			eHovered.addEventListener('mouseover', function() {
				const randomIndex = Math.floor(Math.random() * sounds.length);
				const audio= new Audio(rootSoundDirectory + sounds[randomIndex]);
				audio.volume = 0.1;
				try {
					audio.play();
				} catch(DOMException) {}
			});
		}
	}
});
