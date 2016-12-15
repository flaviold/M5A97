var Game = function (settings) {
  this.keyboard = new THREEx.KeyboardState();
  this.settings = settings;
  this.waitingResponse = true;

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

  this.mainloop = function (timestamp) {
    //FPS sync
    if (timestamp < this.lastLoop + (1000 / this.settings.MaxFPS)) {
        requestAnimationFrame(this.mainloop);
        return;
    }
    this.lastLoop = timestamp;

    if (this.waitingResponse) return;

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

    game.realFps.push(1000/(timestamp - game.lastTime));
    game.realFps.shift();

    //continue looping
    requestAnimationFrame(this.mainloop);
  };
}










// var game = {},
// 	  keyboard = new THREEx.KeyboardState(),
//     settings,
// 	  waitingResponse = false;

// game.fps = 100; //send commands fps
// game.commands = {
//   start: false,
//   select: false,

//   up: false,
//   down: false,
//   left: false,
//   right: false,

//   a: false,
//   b: false,
//   x: false,
//   y: false
// };

// this.lastTime = new Date();
// this.realFps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// this.showFPS = function (ctx) {
//   var sum = 0,
//       avg;

//   for (var i = 0; i < this.realFps.length; i++) {
//     sum += this.realFps[i];
//   }

//   avg = sum/this.realFps.length;
//   ctx.fillStyle = "#FF0000";
//   ctx.fillText(avg.toPrecision(2), 0, 15);
// };

// this.drawScreen = function (ctx, baseStr) {
//   var image = new Image();
//   image.src = "data:image/png;base64," + baseStr;
//   ctx.drawImage(image, 0, 0, width, height);
//   this.showFPS(ctx);
// };

// this.mainloop = function () {
//   if (waitingResponse) return;

//   var message = "[";
//   message += 'Start:' + ((keyboard.pressed('enter')) ? 1 : 0) + ';';
//   message += 'Select:' + ((keyboard.pressed('esc')) ? 1 : 0) + ';';
//   message += 'Up:' + ((keyboard.pressed('up')) ? 1 : 0) + ';';
//   message += 'Down:' + ((keyboard.pressed('down')) ? 1 : 0) + ';';
//   message += 'Left:' + ((keyboard.pressed('left')) ? 1 : 0) + ';';
//   message += 'Right:' + ((keyboard.pressed('right')) ? 1 : 0) + ';';
//   message += 'A:' + ((keyboard.pressed('A')) ? 1 : 0) + ';';
//   message += 'B:' + ((keyboard.pressed('B')) ? 1 : 0) + ';';
//   message += 'X:' + ((keyboard.pressed('X')) ? 1 : 0) + ';';
//   message += 'Y:' + ((keyboard.pressed('Y')) ? 1 : 0) + ']';

//   console.log(message);

//   waitingResponse = true;

//   socket.emit('message', message);
// };