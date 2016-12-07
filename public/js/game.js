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
  console.log("fps: " + avg.toPrecision(2));
  ctx.fillStyle = "#FF0000";
  ctx.fillText(avg.toPrecision(2), 0, 15);
};

game.drawScreen = function (ctx, baseStr) {
  var image = new Image();
  image.onload = function() {
      ctx.drawImage(image, 0, 0);
      game.showFPS(ctx);
  };
  image.src = "data:image/png;base64," + baseStr;
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
  socket.emit('message', keyboard.pressed('enter') + ";" + keyboard.pressed('esc') + ";" + keyboard.pressed('up') + ";" + keyboard.pressed('down') + ";" + keyboard.pressed('left') + ";" + keyboard.pressed('right') + ";" + keyboard.pressed('A') + ";" + keyboard.pressed('B') + ";" + keyboard.pressed('X') + ";" + keyboard.pressed('Y'));
  //gameSocket.emit("data", "game.commands");

  var time = new Date();
  game.realFps.push(1000/(time - game.lastTime));
  game.realFps.shift();
  game.lastTime = time;
};