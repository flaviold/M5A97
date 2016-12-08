var game = {},
	  keyboard = new THREEx.KeyboardState(),
	  waitingResponse = false;

game.fps = 60; //send commands fps
game.commands = {
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

game.lastTime = new Date();
game.realFps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

game.showFPS = function (ctx) {
  var sum = 0,
      avg;

  for (var i = 0; i < game.realFps.length; i++) {
    sum += game.realFps[i];
  }

  avg = sum/game.realFps.length;
  ctx.fillStyle = "#FF0000";
  ctx.fillText(avg.toPrecision(2), 0, 15);
};

game.drawScreen = function (ctx, baseStr) {
  var image = new Image();
  image.src = "data:image/png;base64," + baseStr;
  image.width = width;
  image.height = height;
  ctx.drawImage(image, 0, 0);
  game.showFPS(ctx);
};

game.mainloop = function () {
  if (waitingResponse) return;

  var message = "[";
  message += 'Start:' + ((keyboard.pressed('enter')) ? 1 : 0) + ';';
  message += 'Select:' + ((keyboard.pressed('esc')) ? 1 : 0) + ';';
  message += 'Up:' + ((keyboard.pressed('up')) ? 1 : 0) + ';';
  message += 'Down:' + ((keyboard.pressed('down')) ? 1 : 0) + ';';
  message += 'Left:' + ((keyboard.pressed('left')) ? 1 : 0) + ';';
  message += 'Right:' + ((keyboard.pressed('right')) ? 1 : 0) + ';';
  message += 'A:' + ((keyboard.pressed('A')) ? 1 : 0) + ';';
  message += 'B:' + ((keyboard.pressed('B')) ? 1 : 0) + ';';
  message += 'X:' + ((keyboard.pressed('X')) ? 1 : 0) + ';';
  message += 'Y:' + ((keyboard.pressed('Y')) ? 1 : 0) + ']';

  console.log(message);

  waitingResponse = true;

  socket.emit('message', message);

  var time = new Date();
  game.realFps.push(1000/(time - game.lastTime));
  game.realFps.shift();
  game.lastTime = time;
};