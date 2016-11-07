var UUID    = require('node-uuid'),
    Game    = require('./game.js'),
    server  = module.exports = { games : {}, game_count:0 }

server.createGame = function (player) {
  var game = new Game(player.userid);

  this.games[game.id] = game;
  this.games_count++;
}

server.sendCommand = function (player, command) {
  this.games[player.userid].sendCommand(command);
}
