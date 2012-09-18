var TrackerProtocolHandler = require('../TrackerProtocolAdapter/tracker-protocol-adapter.js');
var HashMap = require('hashmap').HashMap;

module.exports = trackerEventRouter = function(io) {

	var conenctedTrackers = new Object();
	var trackerHandlers = new HashMap();
	
	io.sockets.on('connection', function(socket) {

		io.sockets.emit('this', {
			will : 'be received by everyone'
		});

		socket.emit('news', {
			hello : 'world'
		});
		
		socket.emit('connected-trackers', conenctedTrackers);
		socket.on('my other event', function(data) {
			console.log(data);
		});
	});

	var trackerProtocolHandler = new TrackerProtocolHandler();

	trackerProtocolHandler.on("message", function(message) {
		//console.log(message);
	});

	trackerProtocolHandler.on("tracker-connected", function(id, handler) {
		conenctedTrackers[id] = new Object();
		trackerHandlers.set(id, handler);
		io.sockets.emit('tracker-connected', id);
		console.log('new connection ' + id);
	});

	trackerProtocolHandler.on("tracker-disconnected", function(id) {
		console.log('connection closed ' + id);
		conenctedTrackers[id] = undefined;
		trackerHandlers.remove(id);
		io.sockets.emit('tracker-disconnected', id);
	//	console.log('connected connections ' + trackerHandlers.count());
	});

	trackerProtocolHandler.on("location-update", function(id, location) {
		console.log('location-update ' + id + ' location ' + location);
		var tracker = conenctedTrackers[id];
		io.sockets.emit('location-update', id, location);
		tracker.location = location;
	});
	
	trackerProtocolHandler.on("alarm", function(id, location) {
		console.log('alarm ' + id + ' location ' + location);
		io.sockets.emit('alarm', id, location);
	});
	
	trackerProtocolHandler.on("heart-beat", function(id) {
		console.log('heart beat ' + id);
		io.sockets.emit('heart-beat', id);
	});
	
	trackerProtocolHandler.createServer(1337);

};