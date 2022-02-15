// Module for the board data. Creates board DOM element.
let gameBoard = (() => {
  let board = [];
  const length = 9;
  const displayBoard = () => {
    // Creates a DOM element for every square of the board.
    const boardDOM = document.getElementById("board")
    for (let i = 0; i < length; i++) {
      const square = document.createElement("div");   
      square.setAttribute("class", "square");
      square.setAttribute("id", `${i}`);
      square.style.setProperty("flex-basis", `${100/3}%`)
      boardDOM.appendChild(square);   
    }
  }
  // Check if no more mjoves are possible.
  const checkNull = () => {
    for (let i = 0; i < length; i++) {
      if (board[i] == null) { return true }
    }
    return false
  }
  // Adds click event to grids of the board.
  const addGridClick = () => {
    for (let i = 0; i < length; i++) {
      const gridDOM = document.getElementById(`${i}`)
      gridDOM.addEventListener("click", addMark, false)
    }
  }
  return {
    board,
    length,
    displayBoard,
    addGridClick,
    checkNull
  }  
})()

// Stores winning arrays.
const winningArrays = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

// Displays the board.
gameBoard.displayBoard()

// Factory for players.
const Player = (name, mark) => {
  let markedBoard = []
  const getMark = () => mark
  const getName = () => name
  return {markedBoard, getMark, getName}
}

// Adds event to twoPlayers button. Calls twoPlayerGame.
const twoPlayers = document.getElementById("2players")
twoPlayers.addEventListener("click", twoPlayerGame, false)

// Declare global current player.
let currentPlayer = ""
// Declare players
let player1 = {}
let player2 = {}

// Initializes players, turns and board for 2-persons play.
function twoPlayerGame() {
  // Prompts for players' names and their marks.
  let player1Name = prompt("Enter player one's name (special characters excluded).")
  console.log(player1Name)
  while (player1Name == "" || !isAlphaNumeric(player1Name)) {
    player1Name = prompt("Enter player one's name (special characters excluded).")
  }

  let player1Mark = prompt("Would you like to be X or O?").toUpperCase()
  while (player1Mark != "X" && player1Mark != "O") {
    player1Mark = prompt("Would you like to be X or O?").toUpperCase()
  }

  let player2Name = prompt("Enter player two's name (special characters excluded).")
  while (player2Name == "" || !isAlphaNumeric(player2Name)) {
    player2Name = prompt("Enter player two's name (special characters excluded).")
  }
  let player2Mark = ""
  player1Mark == "X"? player2Mark = "O" : player2Mark = "X"; 

  player1 = Player(player1Name, player1Mark)
  player2 = Player(player2Name, player2Mark)

  // Displays turn.
  turn.displayTurn();
  // Calls for gameBoard.addGridClick.
  gameBoard.addGridClick();
}

// Determines who plays first and turn order. Updates current player variable.
let turn = (() => {
  const turnDOM = document.getElementById("playerTurn")
  const displayTurn = () => {
    // Checks if player1 is registered.
    if (!(Object.keys(player1).length === 0)) {
      for(let i = 0; i < gameBoard.length; i++) {
        // Checks if board is empty.
        if (gameBoard.board.length === 0)
        {
          // Randomizes first player.
          let first = Math.floor(Math.random() * 2) + 1;
          if (first == 1) { currentPlayer = player1 } else { currentPlayer = player2 }
          turnDOM.textContent = `${currentPlayer.getName()} will go first`
        }
      }
    }
  }
  const current = () => {
    // Regular turns.
    if (currentPlayer == player1) { currentPlayer = player2 } else { currentPlayer = player1 }
    turnDOM.textContent = `${currentPlayer.getName()}'s turn`
  }
  return {currentPlayer, displayTurn, current}
})()

// 

// Adds mark to board and edits each players current marks on the board.
function addMark() {
  if (this.textContent == "") {
    const grid = this.id
    // Updates board in gameBoard module
    gameBoard.board[grid] = currentPlayer.getMark()
    // Updates board DOM element.
    this.textContent = `${currentPlayer.getMark()}`
    currentPlayer.markedBoard.push(grid)
    // Checks for winner.
    checkWinner();
    // Displays who plays next turn.
    turn.current()
  }
}

function checkWinner() {
  for (let i = 0; i < 8; i++) {
    const youWin = winningArrays[i].every(element => {
      return currentPlayer.markedBoard.sort().includes(String(element));
    })
    if (youWin) {
      alert(`${currentPlayer.getName()} wins!`)
      break
    }
    // if (i == 7 && !(youWin) && !(gameBoard.checkNull())) {
    //   alert(`{Tie! Nobody wins!}`)
    // }
  }
}

// Checks if input is aphanumeric.
function isAlphaNumeric(str) {
  for (let i = 0; i < str.length; i++) {
    let strcode = str.charCodeAt(i);
    if (!(strcode > 47 && strcode < 58) && // numeric (0-9)
        !(strcode > 64 && strcode < 91) && // upper alpha (A-Z)
        !(strcode > 96 && strcode < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}
