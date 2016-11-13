var game = {},
    socket = io.connect('/'),
    keyboard = new THREEx.KeyboardState(),
    waitingResponse = false,
    canvas,
    ctx;

socket.on('onconnected', function( data ) {
	//Note that the data is the object we sent from the server, as is. So we can assume its id exists.
  console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );
});

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

game.showFPS = function () {
  var sum = 0,
      avg;

  for (var i = 0; i < game.realFps.length; i++) {
    sum += game.realFps[i];
  }

  avg = sum/game.realFps.length;

  ctx.fillText(avg.toPrecision(2), 0, 15);
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
  socket.emit('command', game.commands);

  var time = new Date();
  game.realFps.push(1000/(time - game.lastTime));
  game.realFps.shift();
  game.lastTime = time;
}

window.onload = function () {
  canvas = document.getElementById('viewport');
  ctx = canvas.getContext('2d');
  ctx.fillStyle = "blue";
  ctx.font = "bold 16px Arial";

  setInterval(game.mainloop, 1000/game.fps);

  socket.on('response', function( data ) {
  var img = new Image();
  img.src = 'data:image/png;base64,' + data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.showFPS();
  ctx.drawImage(img, 0, 0);
  waitingResponse = false;
});
}
