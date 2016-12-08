var clientPort 		= parseInt(process.argv[2]),
	gamePort 		= clientPort + 1,
	net 			= require('net'),
	ioServer 		= require('socket.io')(clientPort),
	btoa 			= require('btoa'),
	spawn 			= require('child_process').spawn,
	clientSocket, 
	gameSocket,
	gameServer,
	gameProcess,
	connectSockets;

connectSockets = function () {
	gameSocket.on('data', function (data) {
		clientSocket.emit('message', data.toString());
	});

	clientSocket.on('message', function(data) {
		gameSocket.write(data.toString())
	});

	clientSocket.emit('start');
	console.log('the sockets are connected');
}

gameServer = net.createServer(function (socket) {
	console.log('game connected');
	gameSocket = socket;
	
	if (clientSocket){
		connectSockets();
	}
});

ioServer.on('connection', function (socket) {
	console.log('client connected');
	clientSocket = socket;
	clientSocket.on('disconnect', function () {
		console.log('client disconnected! turning off the game')
		gameProcess.kill('SIGHUP');
		process.exit();
		console.log('game process PID after kill: ' + gameProcess.pid);
	});
	
	gameProcess = spawn('./emulador/snes9x' ,[gamePort, 'emulador/Street-Fighter-II-The-World-Warrior-USA.sfc']);
	console.log('game process PID: ' + gameProcess.pid);

	if (gameSocket){
		connectSockets();
	}
});

gameServer.listen(gamePort);