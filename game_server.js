var express = require('express');
var app 	= express();
var server 	= require('http').Server(app);
var path	= require('path');
var io 		= require('socket.io')(server);
var uid		= require('uid');
var port	= process.env.PORT || 8000;

var GameInstance = require('./game_instance');
var games = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	var id = uid(10);

	new GameInstance(id, io);

	res.render('index', {
		id: id,
		port: port
	});
	res.end();
});

module.exports.listen = function (callback) {
	server.listen(port, function () {
		callback(port);
	});
};