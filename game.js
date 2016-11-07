var game = module.exports = function (id) {
  this.id = id;

  //Começar o jogo
};

game.prototype.sendCommand = function (command) {
  console.log("comando enviado para o jogo " + command.start);
};
