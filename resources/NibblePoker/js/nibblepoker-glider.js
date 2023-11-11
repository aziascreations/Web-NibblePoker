// Creating the galleries from Glider.js

window.addEventListener('load', function(){
	document.querySelectorAll(".glider").forEach(element => {
		console.debug("Creating glider...");
		console.debug(element);
		
		let glider = new Glider(element, {
			slidesToShow: 1,
			draggable: true,
			scrollLock: true,
			scrollLockDelay: 125,
			rewind: true,
			arrows: {
				prev: element.previousSibling,
				next: element.nextSibling
			},
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						duration: 0.25
					}
				},{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				}
			]
		});
		console.debug(glider);
		
		// Processing the images
		const eImages = [];
		
		// Converting the Node to a HTMLElement if needed and desired.
		element.childNodes[0].childNodes.forEach(childrenNode => {
			if(childrenNode.nodeType !== Node.ELEMENT_NODE) {
				return;
			}
			
			// Casting from a Node to a proper HTMLElement because of course we have to add this step in JS...
			const eChildElement = childrenNode.cloneNode(true);
			
			if(eChildElement.tagName.toLowerCase() !== "img") {
				return;
			}
			
			eChildElement.onclick = function() {
				let eModalImage = document.createElement("img")
				eModalImage.classList.add("modal-inner-image");
				eModalImage.classList.add("r-xl");
				eModalImage.src = eChildElement.src;
				eModalImage.alt = eChildElement.alt;
				//halfmoon.toggleModal('modal-content-image-viewer');
				//console.log("Opening image...");
				showContentModal(eModalImage);
			};
			
			// Saving the element for later.
			eImages.push(eChildElement);
		});
		
		// Removing the nodes so that the desired ones can be reinserted later.
		// We start from the rear to prevent issues with de-ordering as we delete them !
		for(let i = element.childNodes[0].childNodes.length - 1; i >= 0; i--) {
			element.childNodes[0].removeChild(element.childNodes[0].childNodes[i]);
		}
		
		eImages.forEach(eImageElement => {
			element.childNodes[0].appendChild(eImageElement);
		});
	});
	
	// The default modal animation looks like ass, jesus...
	let eImgModalCloseButton = document.getElementById("modal-img-close");
	if(eImgModalCloseButton != null) {
		eImgModalCloseButton.onclick = function() {
			halfmoon.toggleModal('modal-content-image-viewer');
		}
	}
});
