var server  = module.exports = {games: {}, game_count: 0 },
    UUID    = require('node-uuid');

server.createGame = function (player) {
  var game = {
    id: player.userid,
  };

  this.games[game.id] = game;
}

server.sendCommand = function (client) {

}
