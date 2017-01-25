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
	splitGameMessage,
	currentCommand = "",
	chunk = "",
	query,
	connectSockets,

splitGameMessage = function (dataList) {
	//console.log(dataList);
	var returnList = [];
	if (dataList.length == 0) {return returnList}
	if (dataList.length == 1) {
		chunk += dataList[0];
		return returnList;
	}
	
	returnList.push(chunk + dataList[0]);

	for (var i = 1; i < dataList.length - 1; i++) {
		returnList.push(dataList[i]);
	}

	chunk += dataList[dataList.length - 1]
	return returnList;
}

connectSockets = function () {
	gameSocket.on('data', function (data) {
		var dataStr = data.toString().split('|')[0];
		var dataParts = splitGameMessage(dataStr.split('|'));

		// for (var i = 0; i < dataParts.length; i++) {
		// 	clientSocket.write(dataParts[i]);
		// }

		if (currentCommand == "") {
			clientSocket.write(dataStr);
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
		clientSocket.write(dataStr);
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
	
	// gameProcess = spawn('./emulator/snes9x' ,[gamePort, 'emulator/Street-Fighter-II-The-World-Warrior-USA.sfc']);
	// gameProcess.stdout.on('data', function (data) {
 //  		console.log(ip + ":" + port_available + " :: Emulator :: " + data);
	// });
	if (gameSocket){
		connectSockets();
	}
});

//==========================================================

Array.prototype.clean = function(deleteValue) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i] == deleteValue) {         
			this.splice(i, 1);
		}
	}
	return this;
};