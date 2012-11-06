
var map = require('/map');

capabilities = [];

ss.rpc('tracker.getConnectedTrackers', null, function(trackers) {
	console.log(trackers);
	connectedTrackers = trackers;
	updateTrackerPins();
	getCapabilities();
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['locationShare']);
	});
}); 



var getCapabilitiesIfRequired = function(protocol) {
	if (capabilities[protocol] == undefined) {
		console.log('getting capabilties for ' + protocol);
		capabilities[protocol] = 'downloading';
		ss.rpc('tracker.getCapabilities', protocol, function(capability) {
			console.log('got capabilties for ' + protocol);
			console.log(capability);
			capabilities[protocol] = capability;
		});
	}
}



var updateTrackerPins = function() {
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		map.updateTrackerPin(tracker);
	}
};

var getCapabilities = function() {
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		getCapabilitiesIfRequired(tracker.protocol);
	}
};




ss.event.on('connected-trackers', function(trackers) {
	connectedTrackers = trackers;
	setTrackers();
});

ss.event.on('tracker-connected', function(tracker) {
	// alert(data);
	console.log('tracker connected ' + tracker.id);
	connectedTrackers[tracker.id] = tracker;
	getCapabilities();
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
	map.updateTrackerPin(tracker);
});

map.initialize();