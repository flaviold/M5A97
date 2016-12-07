var hostname = window.location.hostname,
	socket = io.connect('http://' + hostname + ':' + port),
	chunk = "",
	ctx;

socket.on('connect', function () {
	console.log('logged');
});

window.onload = function () {
	canvas = document.getElementById('viewport');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "white";
	ctx.font = "bold 16px Arial";

	setInterval(game.mainloop, 1000/game.fps);
	socket.on('start', function () {
		console.log('start');
		waitingResponse = false;
	});
	socket.on('message', function (data) {
		// console.log(data);
		// //console.log(JSON.parse(data));
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.drawScreen(ctx, data);
		waitingResponse = false;
	});
}