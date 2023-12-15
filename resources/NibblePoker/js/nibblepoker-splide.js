// Creating the galleries with SplideJs

window.addEventListener('load', function() {
	new Splide( '.splide', {
		perPage: 2,
		cover: true,
		heightRatio: 0.4,
		breakpoints: {
			768: {
				perPage: 1,
			},
		},
	} ).mount();
});
