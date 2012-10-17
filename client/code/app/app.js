
var map = require('/map');

ss.rpc('tracker.getConnectedTrackers', null, function(trackers) {
	console.log(trackers);
	connectedTrackers = trackers;
	setTrackers();
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['locationShare', 'ui.config', 'ui.filters', 'ui.directives', 'ui']);
	});
}); 


var setTrackers = function() {
	console.log(connectedTrackers);
	for(var trackerId in connectedTrackers) {
		var tracker = connectedTrackers[trackerId];
		map.updateTrackerPin(tracker);
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