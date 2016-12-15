var clientPort 		= parseInt(process.argv[2]),
	gamePort 		= "/tmp/snes-socket-" + clientPort + ".socket",
	net 			= require('net'),
	fs 				= require('fs'),
	ioServer 		= require('socket.io')(clientPort),
	btoa 			= require('btoa'),
	spawn 			= require('child_process').spawn,
	clientSocket, 
	gameSocket,
	gameServer,
	gameProcess,
	connectSockets,
	changedStateKeys,
	keysLastState;

// changedStateKeys = function (keys) {
// 	keys = keys.substring(1, keys.lenght - 1);
// 	keyArray = keys.split(';');
// }

connectSockets = function () {
	gameSocket.on('data', function (data) {
		clientSocket.emit('message', data.toString());
	});

	clientSocket.on('message', function(data) {
		// gameSocket.write(data.toString());
		gameSocket.write('0');
	});

	clientSocket.emit('start');
	console.log('the sockets are connected');
}

// gameServer = net.createServer(function (socket) {
// 	console.log('game connected');
// 	gameSocket = socket;
	
// 	if (clientSocket){
// 		connectSockets();
// 	}
// });

ioServer.on('connection', function (socket) {
	console.log('client connected');
	clientSocket = socket;
	clientSocket.on('disconnect', function () {
		console.log('client disconnected! turning off the game')
		//gameProcess.kill('SIGHUP');
		process.exit();
	});
	
	//gameProcess = spawn('./emulator/snes9x' ,[clientPort, 'emulator/Street-Fighter-II-The-World-Warrior-USA.sfc']);

	if (gameSocket){
		connectSockets();
	}
});

fs.unlink(gamePort, function () {
	gameServer = net.createServer(function (socket) {
		console.log('game connected');
		gameSocket = socket;

		if (clientSocket){
			connectSockets();
		}
	});
	gameServer.listen(gamePort, function() {
		console.log('server bound on %s', gamePort);
	});
});

// gameServer.listen(9001);