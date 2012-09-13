var map;

var socket = io.connect('http://localhost');
socket.on('news', function(data) {
	// alert(data);
	// console.log(data);
	socket.emit('my other event', {
		my : 'data'
	});
});

var setTrackers = function() {
	console.log(connectedTrackers);
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		console.log(tracker);
		var location = tracker.location;
		var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);
		console.log(myLatlng);
		var marker = new google.maps.Marker({
	        position: myLatlng,
	        map: map,
	        title: 'Hello World!'
	    });
		console.log(map);
		tracker.marker = marker;
	}
};


socket.on('connected-trackers', function(trackers) {
	//console.log(trackers);
	connectedTrackers = trackers;
	setTrackers();
	//console.log('connected-trackers ' + JSON.stringify(trackers));
});

socket.on('tracker-connected', function(id) {
	// alert(data);
	console.log('tracker connected ' + id);
	connectedTrackers[id] = new Object();
});

socket.on('tracker-disconnected', function(id) {
	// alert(data);
	console.log('tracker-disconnected ' + id);
	connectedTrackers[id].marker.setMap(null);
	connectedTrackers[id] = undefined;
});

socket.on('location-update', function(id, location) {
	connectedTrackers[id].location = location;
	
});



var purple = [ {
	featureType : 'landscape',
	stylers : [ {
		hue : '#00dd00'
	} ]
}, {
	featureType : 'road',
	stylers : [ {
		hue : '#dd0000'
	} ]
}, {
	featureType : 'water',
	stylers : [ {
		hue : '#000040'
	} ]
}, {
	featureType : 'poi.park',
	stylers : [ {
		visibility : 'off'
	} ]
}, {
	featureType : 'road.arterial',
	stylers : [ {
		hue : '#ffff00'
	} ]
}, {
	featureType : 'road.local',
	stylers : [ {
		visibility : 'off'
	} ]
} ];


function initialize() {

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(purple, {
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

google.maps.event.addDomListener(window, 'load', initialize);