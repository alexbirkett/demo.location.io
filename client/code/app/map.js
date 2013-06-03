
exports.initialize = function() {

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.

	var style = require('/map_style').style;
	var styledMap = new google.maps.StyledMapType(style, {
		name : "Styled Map"
	});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom : 2,
		center : new google.maps.LatLng(45, -45),
		mapTypeControlOptions : {
			mapTypeIds : [ google.maps.MapTypeId.ROADMAP, 'map_style' ]
		}
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	// Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

};


var showInfoWindow = function(tracker, pinLocation) {

	var html = ss.tmpl['chat-info'].render({
		longitude : tracker.location.longitude,
		latitude : tracker.location.latitude,
		timestamp : new Date(tracker.location.timestamp),
		available : tracker.location.available,
		speed : tracker.location.speed,
		gsmSignal : tracker.location.status.gsmSignal,
		batteryLife : tracker.location.status.batteryLife,
		cellId : tracker.location.network.cellId,
		countryCode : tracker.location.network.countryCode,
		locationAreaCode : tracker.location.network.locationAreaCode,
		networkCode : tracker.location.network.networkCode,
	});

	var node = $(html);

	var infowindow = new google.maps.InfoWindow({
		content : node[0]
	});

	infowindow.open(map, tracker.marker);

	var element = node.find('#zoom_in');

	element.click(function() {
		map.setCenter(pinLocation);
		map.setZoom(16);
	});

}; 

exports.updateTrackerPin = function(tracker) {
	var location = tracker.location;
	var pinLocation = new google.maps.LatLng(location.latitude, location.longitude);

	if (!tracker.marker) {
		
		
		// Define Marker properties

    var pinImage = new google.maps.MarkerImage('images/pin.png',
        // This marker is 129 pixels wide by 42 pixels tall.
        new google.maps.Size(42, 43),
        // The origin for this image is 0,0.
        new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole.
        new google.maps.Point(21, 43)
    );


    var pinShadow = new google.maps.MarkerImage("images/shadow.png",
        new google.maps.Size(42, 8),
        new google.maps.Point(0, 0),
        new google.maps.Point(21, 6));

		tracker.marker = new google.maps.Marker({
			map : map,
			title : tracker.id,
			icon: pinImage,
           shadow: pinShadow
		});

		google.maps.event.addListener(tracker.marker, 'click', function() {
			//showInfoWindow(tracker, pinLocation);
			window.location.href = "/#/info/" + tracker.id;
		});
		
		google.maps.event.addListener(tracker.marker, 'dblclick', function() {
			map.setCenter(pinLocation);
			map.setZoom(16);
		});
		
	}

	tracker.marker.setPosition(pinLocation);
};

