var GOOGLE = (function () {

  var myOptions = {
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true,
    navigationControl:true,
    streetViewControl: false,
    navigationControlOptions: {
      style:google.maps.NavigationControlStyle.LARGE
    },
    mapTypeControl:false,
    mapTypeControlOptions: {
      style:google.maps.MapTypeControlStyle.DEFAULT
    }
  },
      map = new google.maps.Map(document.getElementById("map"), myOptions),
      wholeUK = new google.maps.LatLng(54.533833, -3.955078),
      infowindow = new google.maps.InfoWindow({
	maxWidth: 250,
	borderColor: '#990000'
      }),
      markerCollection = [],
      photoMarker = 'img/dot.png',
      photoMarkerActive = 'img/dot_splat.png',
      markerCurrent,
      scrollerHTML = '';
		
  google.maps.event.addListener(map, 'tilesloaded', mapLoaded);
  google.maps.event.addListener(infowindow, 'closeclick', closeMarker);
		
  /*********************************
     expected input parameter is an array of photos
   *********************************/	
  function drawMap(photos) {
    console.log('Drawing Map...with ' + photos.length + ' photos');
		
    var bounds = new google.maps.LatLngBounds();				    
    
    // START CONSTRUCTING scrollerHTML
    scrollerHTML += '<div class="items"><div>\r';
				
    $.each(photos, function(i, photo) {
      var photoLocation = new google.maps.LatLng(photo.latitude, photo.longitude),
	  photoTitle = photo.title,
	  photoThumbURL = photo.urlThumb;
					
      // add each photos bound data to the bounds object
      bounds.extend(photoLocation);
      map.fitBounds(bounds);
      //console.log('4');
					
      // create a marker for each photo
      markerCollection[i] = new google.maps.Marker({
	position: photoLocation,
	map: map,
	title: photoTitle,
	icon: photoMarker
      });
      // set the markers animation type
      markerCollection[i].setAnimation(google.maps.Animation.DROP);
					
      // set the click event
      google.maps.event.addListener(markerCollection[i], 'click', function(e) {
	markerClickHandler(photoTitle, photoThumbURL, this);
      });
					
      // ADD singular item to scrollerHTML
      buildScrollerItem(i, photoThumbURL);
    });		
				
    // END CONSTRUCTING scrollerHTML
    scrollerHTML += '</div></div>';
				
    // insert into DOM and make it scrollable
    $('#scrollable').append(scrollerHTML);				
    drawScroller();
				
  }	
    
  function buildScrollerItem(i, photoURL) {			
    if (((i % 7) === 0) && (i > 0)) {
      // create new div group
      scrollerHTML += '</div>\r<div>\r<img src="' + photoURL + '" id="scrollable-thumb-' + i + '" />\r';
    } else {
      // keep building existing div group
      scrollerHTML += '<img src="' + photoURL + '" id="scrollable-thumb-' + i + '" />\r';
    }	
  }		
	
  function mapLoaded() {
    var i,
	len = markerCollection.length;	
			
    $('#loading, #flickr-loader').animate({'opacity' : '0'}, 500, function() {
      $(this).empty().remove();
      //userMarker.setMap(map);
      
      for (i = 0; i < len; i++) {
	markerCollection[i].setMap(map);
      }
    });	
  }
	
  function drawScroller() {	
    var i,
	len = HARVESTPHOTOS.photos.length,
	currentPhotoLocation;
		
    for (i = 0; i < len; i++) {			
      currentPhotoLocation = new google.maps.LatLng(HARVESTPHOTOS.photos[i].latitude, HARVESTPHOTOS.photos[i].longitude);	
      $('#scrollable img#scrollable-thumb-' + i).bind('click', {loc:currentPhotoLocation, scrollableThumbID:i}, thumbClickHandler);
    }
	
    // custom easing called "custom"
    $.easing.custom = function (x, t, b, c, d) {
      var s = 1.70158; 
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }
		
    $("#scrollable").scrollable({easing: 'custom', speed: 700, circular: false});
  }
	
  function thumbClickHandler(e) {
    // open respective map marker	
    markerClickHandler(HARVESTPHOTOS.photos[e.data.scrollableThumbID].title, HARVESTPHOTOS.photos[e.data.scrollableThumbID].urlThumb, markerCollection[e.data.scrollableThumbID]);
    map.panTo(e.data.loc);						
  }
	
  function markerClickHandler(photoTitle, photoThumbURL, currentMarker) {
    if (markerCurrent !== undefined) {
      markerCurrent.setIcon(photoMarker);
    }
    currentMarker.setIcon(photoMarkerActive);
    markerCurrent = currentMarker;
    infowindow.setContent("<div class='infowin'><h3>" + photoTitle + "</h3>" + "<img src='" + photoThumbURL + "' /></div>");
    infowindow.open(map, currentMarker);		
  }
	
  function closeMarker() {
    console.log('called closeMarker');
    markerCurrent.setIcon(photoMarker);
  }
    
  return {
    drawMap : drawMap
  };


})();
