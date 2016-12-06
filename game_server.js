var port		= process.env.PORT || 8000,
	express		= require('express'),
	path		= require('path'),
	new_game	= require('./new_game'),
	port_list	= require('./port_list'),
	app			= express(),

	games = {};

//view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	var ip = req.connection.remoteAddress.split(':')[3];
	var port;
	var return_message;

	new_game(ip, games, port_list);

	if (games[ip]) {
		port = games[ip].port;
	} else {
		port = -1;
		message = "Servidores cheios";
	}

	res.render('index', {
		title: 'Jogo para IP: ' + ip,
		port: port,
		message: return_message
	});
	res.end();
});

app.listen(port);