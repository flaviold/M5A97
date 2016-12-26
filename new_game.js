var spawn = require('child_process').spawn;
var new_game =  function (ip, games, port_list) {
	var port_available = -1,
		is_server_full,
		proc;

	//Não faz nada se aquele IP já está em jogo
	if (games[ip]) {
		console.log("o jogo já existe");
		return;
	}

	//Verifica disponibilidade de portas
	is_server_full = port_list.every(function (obj) {
		if (obj.using) return true;


		port_available = obj.port;
		obj.using = true;
	});

	//não faz nada se o servidor estiver cheio
	if (is_server_full) {
		console.log("servidor cheio");
		return;
	}

	games[ip] = {
		port: port_available, 
		process: spawn('node' ,['game_socket.js', port_available])
	}

	games[ip].process.on('close', function (code) {
		console.log('O processo do IP ' + ip + ' finalizou, deletando o jogo! code: ' + code);
		delete games[ip]
		port_list.every(function (obj) {
			if(obj.port != port_available) return true;

			console.log('Liberando porta ' + port_available);
			obj.using = false;
		});
	});

	games[ip].process.stdout.on('data', function (data) {
  		console.log(ip + ":" + port_available + " :: " + data);
	});

	games[ip].process.stdout.on('error', function (data) {
  		console.log(ip + ":" + port_available + " :: ERROR :: " + data);
	});
}

module.exports = new_game;