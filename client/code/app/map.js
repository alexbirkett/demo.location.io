
var map;

var updateView = require('/location_view_model').updateView;

var infowindow = new google.maps.InfoWindow({
    content: $('#info_window')[0]
});	

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

			$('#zoom_in').click(function() {
				map.setCenter(myLatlng);
				map.setZoom(16);
			});

			updateView(tracker);
			infowindow.open(map, tracker.marker);
		});
	}

	tracker.marker.setPosition(myLatlng);
};

