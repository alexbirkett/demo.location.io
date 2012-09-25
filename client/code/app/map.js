
var map;

exports.initialize = function() {

	console.log('map init');
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.

	var style = require('/map_style').style;
	console.log(style);
	var styledMap = new google.maps.StyledMapType(style, {
		name : "Styled Map"
	});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom : 2,
		center : new google.maps.LatLng(0, 0),
		mapTypeControlOptions : {
			mapTypeIds : [ google.maps.MapTypeId.ROADMAP, 'map_style' ]
		}
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	// Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

};
exports.updateTrackerPin = function(tracker) {
	var location = tracker.location;
	var myLatlng = new google.maps.LatLng(location.latitude, location.longitude);

	if (!tracker.marker) {
		tracker.marker = new google.maps.Marker({
			map : map,
			title : tracker.id
		});

		google.maps.event.addListener(tracker.marker, 'click', function() {

			var html = ss.tmpl['chat-info'].render({
			 	longitude:tracker.location.longitude,
				latitude:tracker.location.latitude,
				timestamp: new Date(tracker.location.timestamp),
				available: tracker.location.available,
				speed: tracker.location.speed,
				gsmSignal: tracker.location.status.gsmSignal,
				batteryLife: tracker.location.status.batteryLife,
				cellId: tracker.location.network.cellId,
				countryCode: tracker.location.network.countryCode,
				locationAreaCode: tracker.location.network.locationAreaCode,
				networkCode: tracker.location.network.networkCode,
			});
			
			var node = $(html);
			console.log(node);
			
			var infowindow = new google.maps.InfoWindow({
			    content:node[0]
			});	
			
			infowindow.open(map, tracker.marker);
	
			var element = node.find('#zoom_in');
			console.log(element);
			
			element.click(function() {
				map.setCenter(myLatlng);
				map.setZoom(16);
			});
			
		});
	}

	tracker.marker.setPosition(myLatlng);
};

