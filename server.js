var UUID    = require('node-uuid'),
    Game    = require('./game.js'),
    server  = module.exports = { games: {}, game_count: 0 }

server.createGame = function (player) {
  var game = new Game(player.userid, ++this.game_count);

  this.games[player.userid] = game;
}

server.sendCommand = function (player, command) {
  console.log("Debug: " + this.game_count + " " + this.games[player.userid]);
  this.games[player.userid].sendCommand(command);
}

