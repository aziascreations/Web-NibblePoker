// Creating the galleries with SplideJs

window.addEventListener('load', function() {
	try {
		new Splide( '.splide', {
			perPage: 2,
			cover: true,
			heightRatio: 0.4,
			breakpoints: {
				768: {
					perPage: 1,
				},
			},
		}).mount();
	} catch(err) {
		console.log("Unable to setup Splide !");
		console.log(err);
	}
});
