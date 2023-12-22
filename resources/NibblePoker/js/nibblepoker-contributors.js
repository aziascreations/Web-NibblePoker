{
	const rootSoundDirectory = "/resources/NibblePoker/sounds/"
	
	class CatData {
		constructor(meows, purrs) {
			this.meowSounds = meows;
			this.purrSounds = purrs;
		}
	}
	
	const kittyData = {
		"kitty-kiki": new CatData(
			["meow-test-01.ogg"],
			["kiki-ronron-01.ogg"]
		),
		"kitty-maki": new CatData(
			["meow-test-02.ogg"],
			[]
		),
	}
	
	document.addEventListener("DOMContentLoaded", () => {
		for(const [eId, catData] of Object.entries(kittyData)) {
			const eHovered = document.getElementById(eId);
			
			const audioPurr = (catData.purrSounds.length > 0) ? new Audio() : null;
			
			if(eHovered !== null) {
				eHovered.addEventListener('mouseover', function() {
					// Playing the meow sound
					if(catData.meowSounds.length > 0) {
						const meowIndex = Math.floor(Math.random() * catData.meowSounds.length);
						const audioMeow = new Audio(rootSoundDirectory + catData.meowSounds[meowIndex]);
						audioMeow.volume = 0.1;
						try {
							audioMeow.play();
						} catch(DOMException) {
						}
					}
					
					// Playing the purr sound
					if(audioPurr !== null) {
						const purrIndex = Math.floor(Math.random() * catData.purrSounds.length);
						audioPurr.src = rootSoundDirectory + catData.purrSounds[purrIndex];
						audioPurr.volume = 0.075;
						try {
							audioPurr.load();
							audioPurr.loop = true;
							audioPurr.play();
						} catch(DOMException) {
						}
					}
				});
				
				eHovered.addEventListener('mouseout', function() {
					// Stopping the purring sound
					if(audioPurr !== null) {
						audioPurr.pause();
					}
				});
			}
		}
	});
}
