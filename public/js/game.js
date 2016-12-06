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

  ctx.fillText(avg.toPrecision(2), 0, 15);
};

game.drawScreen = function (ctx, array) {
  var height = 224,
      width = 256;
      imageData = ctx.getImageData(0, 0, height, width),
      data = imageData.data;
      dataOffset = 0;
  for (var i = 0; i < data.length; i += 3) {
    data[i + dataOffset]     = array[i] % 256;
    data[i + dataOffset+ 1]  = array[i + 1] % 256;
    data[i + dataOffset+ 2]  = array[i + 2] % 256;
    data[i + dataOffset+ 3]  = 255;
    dataOffset++;
  }

  ctx.putImageData(imageData, 0, 0);
};

game.mainloop = function () {
  if (waitingResponse) return;

  game.commands.start   = keyboard.pressed('enter');
  game.commands.select  = keyboard.pressed('esc');

  game.commands.up      = keyboard.pressed('up');
  game.commands.down    = keyboard.pressed('down');
  game.commands.left    = keyboard.pressed('left');
  game.commands.right   = keyboard.pressed('right');

  game.commands.a       = keyboard.pressed('A');
  game.commands.b       = keyboard.pressed('B');
  game.commands.x       = keyboard.pressed('X');
  game.commands.y       = keyboard.pressed('Y');

  waitingResponse = true;
  socket.emit('message', game.commands);
  //gameSocket.emit("data", "game.commands");

  var time = new Date();
  game.realFps.push(1000/(time - game.lastTime));
  game.realFps.shift();
  game.lastTime = time;
};