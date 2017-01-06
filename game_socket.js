var clientPort 		= parseInt(process.argv[2]),
	gamePort 		= "/tmp/snes-socket-" + clientPort + ".socket",
	net 			= require('net'),
	mysql			= require('mysql'),
	fs 				= require('fs'),
	ioServer 		= require('socket.io')(clientPort),
	btoa 			= require('btoa'),
	spawn 			= require('child_process').spawn,
	clientSocket, 
	gameSocket,
	gameServer,
	gameProcess,
	connectSockets,
	connection,
	currentCommand = "",
	query,


connectSockets = function () {
	gameSocket.on('data', function (data) {
		if (currentCommand == "") {
			clientSocket.write(data.toString());
			return;
		}
		query = "INSERT INTO AI_INFO (COMMAND_STRING, SCREEN_IMAGE_BASE64) VALUES (\"" + currentCommand + "\", \"" + data.toString() + "\");";
		try {
			// connection.connect();

			connection.query(query, function(err, rows, fields) {
			  if (err) console.log(err);
			 
			  currentCommand = "";
			});

			currentCommand = "";
		} catch (e) {
			console.log("teste\n" + e)
		}
		clientSocket.write(data.toString());
	});

	clientSocket.on('message', function(data) {
		if (currentCommand == "") currentCommand = data;
		gameSocket.write(data.toString());
	});

	clientSocket.emit('start');
	console.log('the sockets are connected');
}

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'snes',
  password : '123456',
  database : 'SnesDB'
});

connection.connect();

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
		connection.end();
		//gameProcess.kill('SIGHUP');
		process.exit();
	});
	
	//gameProcess = spawn('./emulator/snes9x' ,[gamePort, 'emulator/Street-Fighter-II-The-World-Warrior-USA.sfc']);

	if (gameSocket){
		connectSockets();
	}
});