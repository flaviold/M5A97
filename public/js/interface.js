var hostname = window.location.hostname,
	socket = io.connect('http://' + hostname + ':' + port),
	settings,
	GUI,
	game,
	ctx,
	loop,
	width = 512,
	height = 448;

socket.on('connect', function () {
	console.log('logged');
});

// loop = function () {
// 	game.mainloop();
// }

window.onload = function () {
	//Setting up canvas and context
	canvas = document.getElementById('viewport');
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "white";
	ctx.font = "bold 16px Arial";

	//game settings and dat.GUI lib config
	settings = new Settings()
	GUI = new dat.GUI();
	settings.configureGUI(GUI);
	game = new Game(settings);

	

	//setInterval(game.mainloop, 1000/game.fps);
	socket.on('start', function () {
		//enabling game to send command
		game.mainloop();
	});
	socket.on('message', function (data) {
		//drawing screen
		game.drawScreen(ctx, data);

		//enabling game to send another command
		game.waitingResponse = false;
	});
}