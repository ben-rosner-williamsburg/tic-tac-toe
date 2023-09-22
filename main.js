var playerOneContainer = document.querySelector(".player-one-container");
var playerTwoContainer = document.querySelector(".player-two-container");
var gameBoard = document.querySelector(".game-board");
var spaces = document.querySelectorAll(".space");
var headerText = document.querySelector(".header-text");

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
  if (!gameState.spacesOccupied.includes(event.target.id) && event.target.classList.contains("space")) {
    gameBoardState(currentPlayer, event);
    occupySpace(event);
    displayToken(currentPlayer, event);
    takeTurn();
    checkForDraw();
    checkForWin();
    displayPlayerInfo(playerOne, playerOneContainer);
    displayPlayerInfo(playerTwo, playerTwoContainer);
  }
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
    changeHeaderText(`It's ${playerTwo.token}\'s turn`)
    currentPlayer = playerTwo;
  }
  else {
    changeHeaderText(`It's ${playerOne.token}\'s turn`)
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
      playerOne.playerSpacesOccupied.includes(combinations[i][2])) {
      changeHeaderText(`${playerOne.token} wins!`);
      increaseWins(playerOne);
      gameState.wins.push(playerOne);
      resetBoard();
    }
    else if (playerTwo.playerSpacesOccupied.includes(combinations[i][0]) &&
      playerTwo.playerSpacesOccupied.includes(combinations[i][1]) &&
      playerTwo.playerSpacesOccupied.includes(combinations[i][2])) {
      changeHeaderText(`${playerTwo.token} wins`);
      increaseWins(playerTwo);
      gameState.wins.push(playerTwo);
      resetBoard();
    }
  }
}

function checkForDraw() {
  if (gameState.spacesOccupied.length >= 9 && checkForWin !== true) {
    changeHeaderText("It's a draw!")
    resetBoard();
  }
}

function resetBoard() {
  setTimeout(function () {
    if (gameState.wins[gameState.wins.length - 1] === playerOne) {
      currentPlayer = playerTwo;
      changeHeaderText(`It's ${playerTwo.token}\'s turn`);
    }
    else if (gameState.wins[gameState.wins.length - 1] === playerTwo) {
      currentPlayer = playerOne;
      changeHeaderText(`It's ${playerOne.token}\'s turn`);
    }
    gameState.spacesOccupied = [];
    playerOne.playerSpacesOccupied = [];
    playerTwo.playerSpacesOccupied = [];
    for (var i = 0; i < spaces.length; i++) {
      spaces[i].innerHTML = ""
    }
  }, 1000);
}

function changeHeaderText(newText) {
  headerText.textContent = `${newText}`;
}