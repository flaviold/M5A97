var port	= process.env.PORT || 8000,
	verbose	= true,

	io		= require('socket.io'),
	express	= require('express'),
	UUID	= require('node-uuid'),
	http	= require('http'),

	app		= express(),
	server	= http.createServer(app),
	sio		= io.listen(server);

server.listen(port);

console.log('\t :: Express :: listen on port ' + port);

app.get('/', function (req, res) {
    verbose && console.log("\t :: Express :: sending " + __dirname + "/index.html to " + req.connection.remoteAddress);
    res.sendfile("/index.html", { root: __dirname });
});

app.get('/*', function (req, res, next) {
    var file = req.params[0];

    if (verbose) console.log('\t :: Express :: filerequested : ' + file);

    res.sendfile(__dirname + '/' + file);
});


sio.configure(function () {
    sio.set('log level', 0);
    sio.set('authorization', function (handshakeData, callback) {
        callback(null, true);
    });

    //game_server = require('./game.server.js');

    sio.sockets.on('connection', function (client) {
        client.userid = UUID();

        client.emit('onconnected', { id: client.userid });

        //game_server.findGame(client);

        verbose && console.log('\t socket.io:: player ' + client.userid + ' connected');

        client.on('command', function (command) {
            console.log('\t socket.io:: command from ' + client.userid + ': ' + command.start);
            //game_server.onMessage(client, m);
        });

        client.on('disconnected', function () {
            verbose && console.log('\t socket.io:: client disconnected ' + client.userid + ' ' + client.game_id);

            //if (client.game && client.game.id) {
            //    game_server.endGame(client.game.id, client.userid);
            //}
        });
    });
});
