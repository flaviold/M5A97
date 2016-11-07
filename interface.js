var game = {},
    socket = io.connect('/'),
    keyboard = new THREEx.KeyboardState(),
    waitingResponse = false;

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


mainloop = function () {
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

  //waitingResponse = true;
  socket.emit('command', game.commands);
}

window.onload = function () {
  setInterval(mainloop, 1000/game.fps);
}
