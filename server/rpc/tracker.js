// Server-side Code
var TrackerProtocolHandler = require('../../../TrackerProtocolAdapter/tracker-protocol-adapter.js');
var HashMap = require('hashmap').HashMap;
var ss = require('socketstream').api;

var conenctedTrackers = new Object();
var trackerHandlers = new HashMap();

var trackerProtocolHandler = new TrackerProtocolHandler();

trackerProtocolHandler.on("message", function(message) {
	//console.log(message);
});

trackerProtocolHandler.on("tracker-connected", function(tracker, handler) {
	conenctedTrackers[tracker.id] = tracker;
	trackerHandlers.set(tracker.id, handler);
	ss.publish.all('tracker-connected', tracker);
	console.log('new connection ' + tracker.id);
});

trackerProtocolHandler.on("tracker-disconnected", function(id) {
	console.log('connection closed ' + id);
	conenctedTrackers[id] = undefined;
	trackerHandlers.remove(id);
	ss.publish.all('tracker-disconnected', id);
	//	console.log('connected connections ' + trackerHandlers.count());
});

trackerProtocolHandler.on("location-update", function(id, location) {
	console.log('location-update ' + id + ' location ' + location);
	var tracker = conenctedTrackers[id];
	ss.publish.all('location-update', id, location);
	tracker.location = location;
});

trackerProtocolHandler.on("alarm", function(id, location) {
	console.log('alarm ' + id + ' location ' + location);
	ss.publish.all('alarm', id, location);
});

trackerProtocolHandler.on("heart-beat", function(id) {
	console.log('heart beat ' + id);
	ss.publish.all('heart-beat', id);
});

trackerProtocolHandler.createServer(1337);

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

	console.log('tracker-event-router init');
	req.use('session');
	
	return {

		getConnectedTrackers : function(message) {
			console.log('get connected trackers');
			return res(conenctedTrackers);
			
		}

	};

};