var playerOneContainer = document.querySelector(".player-one-container");
var playerTwoContainer = document.querySelector(".player-two-container");
var gameBoard = document.querySelector(".game-board");
var spaces = document.querySelectorAll(".space");

var gameState = {
  spaceOccupied: [],
  wins: []
};

var playerOne = createPlayer(1, "❎");
var playerTwo = createPlayer(2, "🅾️");
var currentPlayer = playerOne

playerOneContainer.addEventListener("load", displayPlayerInfo(playerOne, playerOneContainer));
playerTwoContainer.addEventListener("load", displayPlayerInfo(playerTwo, playerTwoContainer));
gameBoard.addEventListener("click", function (event) {
  takeTurn()
  gameBoardState(currentPlayer, event);
  occupySpace(event);
  displayToken(currentPlayer, event);
})

function createPlayer(id, token, wins = 0) {
  var player = {
    id: id,
    token: token,
    wins: wins,
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

function gameBoardState(player, event) {
  for (var i = 0; i < spaces.length; i++) {
    if (event.target.id === spaces[i].id) {
      displayToken(player, event)
    }
  }
}

function takeTurn() {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
    }
    else {
      currentPlayer = playerOne;
    }
}

function displayToken(player, event) {
  event.target.innerHTML = `<h1 class="token">${player.token}</h1>`
}

function occupySpace(event) {
  for (var i = 0; i < spaces.length; i++) {
    if (event.target.id === spaces[i].id) {
      gameState.spaceOccupied.push(spaces[i]) 
    }
  }
}