
var TrackerProtocolHandler = require('../TrackerProtocolAdapter/tracker-protocol-adapter.js');
var HashMap = require('../hashmap/hashmap').HashMap;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

function getPortParameter() {
	
	var args = process.argv.slice(2);
	if (args.length < 1) {
		throw "usage  <port>";
	}
	
	return args[0];
}

var trackerProtocolHandler = new TrackerProtocolHandler();

trackerProtocolHandler.on("message", function(message) {
	console.log(message);
});

var handlers = new HashMap();

trackerProtocolHandler.on("connection", function(handler) {
	handlers.set(handler.getId(), handler);
	console.log('new connection ' + handler.getId());
});

trackerProtocolHandler.on("close", function(handler) {
	console.log('connection closed', handler.getId());
	handlers.remove(handler.getId(), handler);
	console.log('connected connections ' + handlers.count());
});

trackerProtocolHandler.createServer(getPortParameter());

server.listen(8090);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.use('/scripts', express.static(__dirname + '/public/scripts'));


io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});
