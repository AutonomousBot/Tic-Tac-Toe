let gameBoard = (() => {
  let board = [];
  board.length = 9;
  const displayBoard = () => {
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

gameBoard.displayBoard()