var map;

var socket = io.connect('http://locationshare.org');

var setTrackers = function() {
	console.log(connectedTrackers);
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		updateTrackerPin(tracker);
	}
};

var LocationModel = function() {
    this.timestamp = ko.observable("");
    this.latitude = ko.observable("");
    this.longitude = ko.observable("");
    this.available = ko.observable(false);
    this.speed = ko.observable(false);
    this.batteryLife = ko.observable(0);
    this.gsmSignal = ko.observable(0);
    this.cellId = ko.observable(0);
    this.countryCode = ko.observable(0);
    this.locationAreaCode = ko.observable(0);
    this.networkCode = ko.observable(0);
};

var locationModel = new LocationModel();

$(function() {
	ko.applyBindings(locationModel);
});


function updateView(tracker) {
	console.log("update view " + tracker.location.timestamp);
	locationModel.longitude(tracker.location.longitude);
	locationModel.latitude(tracker.location.latitude);
	locationModel.timestamp(new Date(tracker.location.timestamp));
	locationModel.available(tracker.location.available);
	locationModel.speed(tracker.location.speed);
	locationModel.gsmSignal(tracker.location.status.gsmSignal);
	locationModel.batteryLife(tracker.location.status.batteryLife);
	locationModel.cellId(tracker.location.network.cellId);
	locationModel.countryCode(tracker.location.network.countryCode);
	locationModel.locationAreaCode(tracker.location.network.locationAreaCode);
	locationModel.networkCode(tracker.location.network.networkCode);
	    
}

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
	        title: 'Hello World!'
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

socket.on('connected-trackers', function(trackers) {
	connectedTrackers = trackers;
	setTrackers();
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
	var tracker = connectedTrackers[id];
	tracker.location = location;
	updateTrackerPin(tracker);
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
}];


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