
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var TrackerEventRouter = require('./tracker-event-router');

function getPortParameter() {
	
	var args = process.argv.slice(2);
	if (args.length < 1) {
		throw "usage  <port>";
	}
	
	return args[0];
}



server.listen(8090);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));

/*io.sockets.on('connection', function(socket) {
	
	io.sockets.emit('this', { will: 'be received by everyone'});

	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});*/

var trackerEventRouter = new TrackerEventRouter(io);

