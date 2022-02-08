let gameBoard = (() => {
  let board = [];
  // Sets board array with 9 empty elements.
  board.length = 9;
  const displayBoard = () => {
    // Creates a DOM element for every square of the board.
    const boardDOM = document.getElementById("board")
    for (let i = 0; i < board.length; i++) {
      const square = document.createElement("div");   
      square.setAttribute("class", "square");
      square.style.setProperty("flex-basis", `${100/3}%`)
      boardDOM.appendChild(square);   
    }
    return;
  }
  return {
    board,
    displayBoard
  }  
})()

// Factory for players.
const Player = (name, marker) => {
  let markedBoard = []
  const getMarker = () => marker
  const getName = () => name
  return {markedBoard, getMarker, getName}
}

const twoPlayers = document.getElementById("2players")
twoPlayers.addEventListener("click", twoPlayerGame, false)

function twoPlayerGame() {
  let player1Name = prompt("Enter player one's name (special characters excluded).")
  console.log(player1Name)
  while (player1Name == "" || !isAlphaNumeric(player1Name)) {
    player1Name = prompt("Enter player one's name (special characters excluded).")
  }

  let player1Marker = prompt("Would you like to be X or O?").toUpperCase()
  while (player1Marker != "X" && player1Marker != "O") {
    player1Marker = prompt("Would you like to be X or O?").toUpperCase()
  }

  let player2Name = prompt("Enter player two's name (special characters excluded).")
  while (player2Name == "" || !isAlphaNumeric(player2Name)) {
    player2Name = prompt("Enter player two's name (special characters excluded).")
  }
  let player2Marker = ""
  player1Marker == "X"? player2Marker = "O" : player2Marker = "X"; 

  const player1 = Player(player1Name, player1Marker)
  const player2 = Player(player2Name, player2Marker)
  
  let currentPlayer = ""
  // Determines who plays first and turn order.
  const turn = (() => {
    const turndisplay = document.getElementById("playerTurn")
    for(let i = 0; i < board.length; i++) {
      if (player1.markedBoard == [] && player2.markedBoard ==[])
      {
        // Randomizes first player.
        (Math.floor(Math.random() * 2) + 1 == 1)? currentPlayer = player1 : currentPlayer = player2
        turndisplay.textContent = `${currentPlayer.getName()} will go first`
      }
      else {
        currentPlayer == player1? currentPlayer = player2 : currentPlayer = player1
        turndisplay.textContent = `${currentPlayer.getName()} will go first`
      }
    }
    return {currentPlayer}
  })()
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

// Displays the board.
gameBoard.displayBoard()