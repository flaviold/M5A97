var Game = function (settings) {
	this.keyboard = new THREEx.KeyboardState();
	this.settings = settings;
	this.waitingResponse = false;

	this.lastLoop = 0;

	this.commands = {
		start: false,
		select: false,

		up: false,
		down: false,
		left: false,
		right: false,

		a: false,
		b: false,
		x: false,
		y: false
	};

	this.realFps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	this.showFPS = function (ctx) {
		var sum = 0,
		avg;

		for (var i = 0; i < this.realFps.length; i++) {
			sum += this.realFps[i];
		}

		avg = sum/this.realFps.length;
		ctx.fillStyle = "#FF0000";
		ctx.fillText(avg.toPrecision(2), 0, 15);
	};

	this.drawScreen = function (ctx, baseStr) {
		var image = new Image();
		image.src = "data:image/png;base64," + baseStr;
		ctx.drawImage(image, 0, 0, width, height);
		this.showFPS(ctx);
	};

	this.mainloop = function () {
		//FPS sync
		if (this.waitingResponse) {
			loop();
			return;
		}
		// this.realFps.push(1000/(timestamp - this.lastLoop));
		// this.realFps.shift();
		// this.lastLoop = timestamp;

		var message = "[";
		message += 'Start:' + ((this.keyboard.pressed(settings.Start)) ? 1 : 0) + ';';
		message += 'Select:' + ((this.keyboard.pressed(settings.Select)) ? 1 : 0) + ';';
		message += 'Up:' + ((this.keyboard.pressed(settings.Up)) ? 1 : 0) + ';';
		message += 'Down:' + ((this.keyboard.pressed(settings.Down)) ? 1 : 0) + ';';
		message += 'Left:' + ((this.keyboard.pressed(settings.Left)) ? 1 : 0) + ';';
		message += 'Right:' + ((this.keyboard.pressed(settings.Right)) ? 1 : 0) + ';';
		message += 'A:' + ((this.keyboard.pressed(settings.A)) ? 1 : 0) + ';';
		message += 'B:' + ((this.keyboard.pressed(settings.B)) ? 1 : 0) + ';';
		message += 'X:' + ((this.keyboard.pressed(settings.X)) ? 1 : 0) + ';';
		message += 'Y:' + ((this.keyboard.pressed(settings.Y)) ? 1 : 0) + ']';

		console.log(message);

		waitingResponse = true;

		socket.emit('message', message);

		//continue looping
		var time = new Date();
		this.realFps.push(1000/(time - this.lastLoop));
		this.realFps.shift();
		this.lastLoop = time;

		setTimeout(loop, 1000/settings.MaxFPS);
		//requestAnimationFrame(loop);
	};
}