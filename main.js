var playerOneContainer = document.querySelector(".player-one-container");
var playerTwoContainer = document.querySelector(".player-two-container");

var gameState = {};
var playerOne = createPlayer(1, "😳");
var playerTwo = createPlayer(2, "🌮");

playerOneContainer.addEventListener("load", function () {
  displayPlayerInfo(playerOne, playerOneContainer);
});
playerTwoContainer.addEventListener("load", function () {
  displayPlayerInfo(playerTwo, playerTwoContainer);
});


function createPlayer(id, token, wins = 0) {
  var player = {
    id: id,
    token: token,
    wins: wins
  }
  return player;
}

function increaseWins(player) {
  player.wins++;
}

function displayPlayerInfo(player, container) {
  container.innerHTML = `<h2>${player.token}<h2>
  <h4>${player.wins} wins </h4>`;
}

