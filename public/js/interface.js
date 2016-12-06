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
	ctx.fillStyle = "blue";
	ctx.font = "bold 16px Arial";

	setInterval(game.mainloop, 1000/game.fps);

	socket.on('message', function (data) {
		chunk += data;
		if (data.indexOf(']') >= 0) {
			try {
				var JSONdata = JSON.parse(chunk);
				game.drawScreen(ctx, JSONdata);
				game.showFPS(ctx);
				waitingResponse = false;
			} catch (err) {
				console.log(err);
			}
			//console.log(JSON.parse(chunk));

			//ctx.clearRect(0, 0, canvas.width, canvas.height);
			// game.drawScreen(ctx, );
			// game.showFPS(ctx);
			// waitingResponse = false;
			chunk = "";
		}
		// console.log(data);
		// //console.log(JSON.parse(data));
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		// //game.drawScreen(ctx);
		// game.showFPS(ctx);
		// waitingResponse = false;
	});
}