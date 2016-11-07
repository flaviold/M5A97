var game = module.exports = function (id) {
  this.id = id;

  //Começar o jogo
};

game.prototype.sendCommand = function (command) {
  var messageArray = [],
  	  message;
  command.start && messageArray.push("Start");
  command.select && messageArray.push("Select");

  command.up && messageArray.push("Up");
  command.down && messageArray.push("Down");
  command.left && messageArray.push("Left");
  command.right && messageArray.push("Right");

  command.a && messageArray.push("A");
  command.b && messageArray.push("B");
  command.x && messageArray.push("X");
  command.y && messageArray.push("Y");

  if (messageArray.length == 0) {
  	//message = "No button Pressed";
  	return;
  } else {
  	message = "Pressed: " + messageArray.join(", ");
  }

  console.log(message);
};
