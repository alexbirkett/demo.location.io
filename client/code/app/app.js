
var map = require('/map');

capabilities = [];

ss.rpc('tracker.getConnectedTrackers', null, function(trackers) {
	connectedTrackers = trackers;
	updateTrackerPins();
	getCapabilities();
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['locationShare']);
	});
}); 



var getCapabilitiesIfRequired = function(protocol) {
	if (capabilities[protocol] == undefined) {
		capabilities[protocol] = 'downloading';
		ss.rpc('tracker.getCapabilities', protocol, function(capability) {
			capabilities[protocol] = capability;
		});
	}
}



var updateTrackerPins = function() {
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		if (tracker.location != undefined) {
			map.updateTrackerPin(tracker);		
		}
	}
};

var getCapabilities = function() {
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		getCapabilitiesIfRequired(tracker.protocol);
	}
};

ss.event.on('tracker-connected', function(tracker) {
	connectedTrackers[tracker.id] = tracker;
	getCapabilities();
});

ss.event.on('tracker-disconnected', function(id) {
	connectedTrackers[id].marker.setMap(null);
	connectedTrackers[id] = undefined;
});

ss.event.on('message', function(id, message) {
	var tracker = connectedTrackers[id];
	if (message.location != undefined) {
		tracker.location = message.location;
		map.updateTrackerPin(tracker);	
	}

});

map.initialize();