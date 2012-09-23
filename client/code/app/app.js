var map;

var updateView = require('/location_view_model').updateView;

ss.rpc('tracker.getConnectedTrackers', null, function(trackers) {
	console.log(trackers);
	connectedTrackers = trackers;
	setTrackers();
});

var setTrackers = function() {
	console.log(connectedTrackers);
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		updateTrackerPin(tracker);
	}
};



var infowindow;
$(function() {
	infowindow = new google.maps.InfoWindow({
	    content: $('#info_window')[0]
	});	
});

function updateTrackerPin(tracker) {
	var location = tracker.location;
	var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);

	if (!tracker.marker) {
		tracker.marker = new google.maps.Marker({
	        map: map,
	        title: tracker.id
	    });
	

	
	google.maps.event.addListener(tracker.marker, 'click', function() {

		
		
		$('#zoom_in').click(function() {
			map.setCenter(myLatlng);
			map.setZoom(16);
			});
		
		updateView(tracker);
		infowindow.open(map,tracker.marker);
		});
	}
	
	tracker.marker.setPosition(myLatlng);
	}

ss.event.on('connected-trackers', function(trackers) {
	connectedTrackers = trackers;
	setTrackers();
});

ss.event.on('tracker-connected', function(tracker) {
	// alert(data);
	console.log('tracker connected ' + tracker.id);
	connectedTrackers[tracker.id] = tracker;
});

ss.event.on('tracker-disconnected', function(id) {
	// alert(data);
	console.log('tracker-disconnected ' + id);
	connectedTrackers[id].marker.setMap(null);
	connectedTrackers[id] = undefined;
});

ss.event.on('location-update', function(id, location) {
	var tracker = connectedTrackers[id];
	tracker.location = location;
	updateTrackerPin(tracker);
});

function initialize() {

	console.log('map init');
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(require('/map_style.js'), {
		name : "Styled Map"
	});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom :2,
		center : new google.maps.LatLng(0, 0),
		mapTypeControlOptions : {
			mapTypeIds : [ google.maps.MapTypeId.ROADMAP, 'map_style' ]
		}
	};
	map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	
}
initialize();
//google.maps.event.addDomListener(window, 'load', initialize);