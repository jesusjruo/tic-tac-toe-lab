const squares = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");
const restart = document.querySelector("#restart");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

  function handleClick(event) {
    const id = event.target.id;
    // const { id } = event.target; -> deconstructing id from event.target
    if (board[id] === "") {
      board[id] = currentPlayer;
      event.target.textContent = currentPlayer;
      if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        squares.forEach(square => square.removeEventListener("click", handleClick));
        restart.classList.remove("hidden"); 
      } else if (board.every(cell => cell !== "")) {
        message.textContent = "It's a tie!";
        restart.classList.remove("hidden");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }

  function checkWin() {

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombos.some(pattern => {
        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];
        // const [a, b, c] = pattern; -> using array destructuring.
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

squares.forEach(square => square.addEventListener("click", handleClick));
restart.addEventListener("click" , () => location.reload());