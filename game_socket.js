var clientSocket, 
	gameSocket,
	clientPort = parseInt(process.argv[2]),
	gamePort = clientPort + 1,
	net = require('net'),
	ioServer = require('socket.io')(clientPort),
	gameServer,
	connectSockets;

connectSockets = function () {
	gameSocket.on('data', function (data) {
		//console.log('game data: ' + data.toString());
		clientSocket.emit('message', data.toString());
	});

	clientSocket.on('message', function(data) {
		gameSocket.write(data.toString())
	});

	console.log('the sockets are connected');
}

gameServer = net.createServer(function (socket) {
	console.log('game connected');
	gameSocket = socket;
	// socket.on('data', function (data) {
	// 	console.log('game data: ' + data.toString());
	// 	//socket.write(data.toString() == "netcat");
	// });
	if (clientSocket){
		connectSockets();
	}
});

ioServer.on('connection', function (socket) {
	console.log('client connected');
	clientSocket = socket;
	// socket.on('message', function(data) {
	// 	console.log('client data: ' + data);
	// });

	if (gameSocket){
		connectSockets();
	}
});



gameServer.listen(gamePort);