var FLICKR = (function () {

	// flickr will hold our amalgamated flickr data
	var flickrPrefix = 'https://api.flickr.com/services/rest/?&method=',
		flickrResponseSuffix = '&format=json&jsoncallback=?',
		photoCollection = [],
		totalPhotos = undefined, 
		jsonResponse = 0,
		$main = $('#main');
	
	/*********************************
	settings argument is an object, eg:
		var settings = {
			provider 	: 0,
			apiKey		: '634562c3512132b584e66ff22d4c5288',
			userID		: '39569477@N05',
			photoSize 	: 'm'
		};
	*********************************/
	function getAllPhotos(settings) {
		// build flickr.people.getPublicPhotos url
	    var getPublicPhotosMethod = flickrPrefix + 'flickr.photosets.getPhotos&api_key=' + settings.apiKey + '&photoset_id=' + settings.photosetID + flickrResponseSuffix;

		// build initial JSON request to get latest PUBLIC photos
		$.getJSON(getPublicPhotosMethod, function(rawPhotoData){
			totalPhotos = rawPhotoData.photoset.total;
			$main.append('<p id="hang">Progress: <span id="count">0</span> of ' + totalPhotos + '</p>').text();
			
			// loop through the JSON results to create each photo
			$.each(rawPhotoData.photoset.photo, function(i, photo) {
								
				// build flickr.photos.getInfo url 
				var getInfoMethod = flickrPrefix + 'flickr.photos.getInfo&api_key=' + settings.apiKey + '&photo_id=' + rawPhotoData.photoset.photo[i].id + flickrResponseSuffix;
				
				// use an ajax request to get the info for each photo
				$.getJSON(getInfoMethod, function(info){
					rawPhotoData.photoset.photo[i].info = info;
					
					// now take the raw data and create a clean photo object for each photo (whilst retaining the RAW data just in case...)
					photoCollection[i] = new Photo(rawPhotoData.photoset.photo[i]);
					//console.log(photoCollection[i], i);
					
					// keep track of json response iteration
					jsonResponse++;					
				});
			});						
		});
		// wait for JSON to finish
		checkJSON();		
	}
	
	function checkJSON() {
		// console.log('checkJSON()... totalPhotos = ' + totalPhotos + ' & json response = ' + jsonResponse + ' photoCollection.length = ' + photoCollection.length);
		$main.find('#count').empty().append(photoCollection.length).text();
		if (totalPhotos == jsonResponse) {
			HARVESTPHOTOS.jsonReady(photoCollection);
		} else {
			setTimeout(checkJSON, 500);
		}
	}
	
	function returnPhotoSize(suffix) {
			
		// s small square 75x75 
		// t thumbnail, 100 on longest side 
		// m small, 240 on longest side 
		// - medium, 500 on longest side 
		// z medium 640, 640 on longest side 
		// b large, 1024 on longest side* 
		// o original image, either a jpg, gif or png, depending on source format - must be a PRO account though
		
		var size = suffix,
			format = '.jpg';

		switch (size) {
		case('s'):
			size = '_s' + format;
			break;
		case('t'):
			size = '_t' + format;
			break;
		case('m'):
			size = '_m' + format;
			break;
		case('-'):
			size = '_-' + format;
			break;
		case('z'):
			size = '_z' + format;
			break;
		case('b'):
			size = '_b' + format;
			break;
		case('o'):
			size = '_o' + format;
			break;
		default:
			size = '_m' + format;
		}
		return size;
	};
	
	return {
		getPhotos : getAllPhotos,
		getPhotoSize : returnPhotoSize
	};

})();

