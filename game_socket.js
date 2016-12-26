var clientPort 		= parseInt(process.argv[2]),
	gamePort 		= "/tmp/snes-socket-" + clientPort + ".socket",
	net 			= require('net'),
	fs 				= require('fs'),
	ioServer 		= require('socket.io')(clientPort),
	btoa 			= require('btoa'),
	spawn 			= require('child_process').spawn,
	chunk			= "",
	clientSocket, 
	gameSocket,
	gameServer,
	gameProcess,
	connectSockets,

connectSockets = function () {
	gameSocket.on('data', function (data) {
		var dataStr = data.toString();
		chunk += dataStr;
		if (chunk.indexOf('|') < 0) {
			return;
		}

		dataArr = chunk.split('|');
		for (var i = 0; i < dataArr.length - 1; i++) {
			clientSocket.emit('message', dataArr[i]);
		}

		chunk = dataArr[dataArr.length - 1];
	});

	clientSocket.on('message', function(data) {
		gameSocket.write(data.toString());
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

ioServer.on('connection', function (socket) {
	console.log('client connected');
	clientSocket = socket;
	clientSocket.on('disconnect', function () {
		console.log('client disconnected! turning off the game')
		gameProcess.kill('SIGHUP');
		process.exit();
	});
	
	gameProcess = spawn('./emulator/snes9x' ,[clientPort, 'emulator/Street-Fighter-II-The-World-Warrior-USA.sfc']);

	if (gameSocket){
		connectSockets();
	}
});

// gameServer.listen(9001);