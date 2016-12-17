// create our photo settings object 
var settings = {
	provider 		: 0,
	apiKey 			: '9bea0830994483552aba50c2ac0efc19',
	userID 			: 'nikhiltri',
	photosetID	       	: '72157633372250545',
	photoSize 		: 'm',
	photoThumbSize		: 'm'
};

// start the async JSON request
HARVESTPHOTOS.preFetch(settings);

// document ready
$(function () {
	
	// loading set-up
	
	
	// make sure that the flickr photo collection is ready before starting
	(function isReady() {
		if (HARVESTPHOTOS.isReady === true) {
			GOOGLE.drawMap(HARVESTPHOTOS.photos);
		} else {
			console.log('waiting for JSON....')
			setTimeout(isReady, 500);
		}
	} ());
});  