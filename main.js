var playerOneContainer = document.querySelector(".player-one-container");
var playerTwoContainer = document.querySelector(".player-two-container");
var gameBoard = document.querySelector(".game-board");
var spaces = document.querySelectorAll(".space");

var gameState = {
  spaceOccupied: [],
  wins: []
};

var playerOne = createPlayer(1, "😳");
var playerTwo = createPlayer(2, "🌮");

playerOneContainer.addEventListener("load", displayPlayerInfo(playerOne, playerOneContainer));
playerTwoContainer.addEventListener("load", displayPlayerInfo(playerTwo, playerTwoContainer));
gameBoard.addEventListener("click", function (event) {
  if (playerOne.turn = true) {
    gameBoardState(playerOne, event);
    takeTurn(playerOne, playerTwo);
    occupySpace(event);
    displayToken(playerOne, event);
  }
  else if (playerTwo.turn = true) {
    gameBoardState(playerTwo, event);
    takeTurn(playerTwo, playerOne);
    occupySpace(event);
    displayToken(playerTwo, event);
  }
})


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

function gameBoardState(player, event) {
  for (var i = 0; i < spaces.length; i++) {
    if (event.target.id === spaces[i].id) {
      displayToken(player, event)
    }
  }
}

function takeTurn(player, otherPlayer) {
  player.turn = true;
  otherPlayer.turn = false;
}

function displayToken(player, event) {
  event.target.innerHTML = `<h1>${player.token}</h1>`
}

function occupySpace(event) {
  for (var i = 0; i < spaces.length; i++) {
    if (event.target.id === spaces[i].id) {
      gameState.spaceOccupied.push(spaces[i]) 
    }
  }
}