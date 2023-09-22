var playerOneContainer = document.querySelector(".player-one-container");
var playerTwoContainer = document.querySelector(".player-two-container");
var gameBoard = document.querySelector(".game-board");
var spaces = document.querySelectorAll(".space");

var gameState = {
  spacesOccupied: [],
  wins: []
};

var playerOne = createPlayer(1, "❎");
var playerTwo = createPlayer(2, "🅾️");
var currentPlayer = playerOne;

playerOneContainer.addEventListener("load", displayPlayerInfo(playerOne, playerOneContainer));
playerTwoContainer.addEventListener("load", displayPlayerInfo(playerTwo, playerTwoContainer));
gameBoard.addEventListener("click", function (event) {
  gameBoardState(currentPlayer, event);
  occupySpace(event);
  displayToken(currentPlayer, event);
  checkForWin();
  checkForDraw();
  takeTurn();
})

function createPlayer(id, token, wins = 0) {
  var player = {
    id: id,
    token: token,
    wins: wins,
    playerSpacesOccupied: []
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
  if (event.target.classList.contains("space")) {
    event.target.innerHTML = `<h1 class="token">${player.token}</h1>`;
  }
}

function occupySpace(event) {
  for (var i = 0; i < spaces.length; i++) {
    if (event.target.id === spaces[i].id && currentPlayer === playerOne) {
      playerOne.playerSpacesOccupied.push(spaces[i].id)
      gameState.spacesOccupied.push(spaces[i].id);
    }
    else if (event.target.id === spaces[i].id && currentPlayer === playerTwo) {
      playerTwo.playerSpacesOccupied.push(spaces[i].id)
      gameState.spacesOccupied.push(spaces[i].id);
    }
  }
}

function checkForWin() {
  var combinations = [
    ["one", "two", "three"],
    ["four", "five", "six"],
    ["seven", "eight", "nine"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["three", "six", "nine"],
    ["one", "five", "nine"],
    ["three", "five", "seven"]
  ]
  for (var i = 0; i < combinations.length; i++) {
      if (playerOne.playerSpacesOccupied.includes(combinations[i][0]) && 
      playerOne.playerSpacesOccupied.includes(combinations[i][1]) && 
      playerOne.playerSpacesOccupied.includes(combinations[i][2])){
        increaseWins(playerOne);
        return `Player one wins!`;
      }
      else if (playerTwo.playerSpacesOccupied.includes(combinations[i][0]) && 
      playerTwo.playerSpacesOccupied.includes(combinations[i][1]) && 
      playerTwo.playerSpacesOccupied.includes(combinations[i][2])) {
        increaseWins(playerTwo);
        return `Player two wins!`;
      }
    }
    return "Keep Playing!";
}

function checkForDraw() {
  if (gameState.spacesOccupied.length >= 9){
    return `Draw!`
  }
}