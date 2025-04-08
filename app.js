// Selecting Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#resetBtn");
const newGameButton = document.querySelector("#newGameBtn");
const winnerModal = document.querySelector("#winnerModal");
const winnerName = document.querySelector("#winnerName");
const closeModalButton = document.querySelector("#closeModalBtn");

let isPlayerX = true; // Track current player

// Winning Combinations
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to Check Winner
const checkWinner = () => {
  for (const [a, b, c] of winConditions) {
    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      return cells[a].innerText; // "X" or "O" (winner)
    }
  }
  return null; // No winner
};

// Check if Board is Full
const isBoardFull = () => [...cells].every((cell) => cell.innerText !== "");

// Update Button States
const updateButtons = () => {
  if (isBoardFull()) {
    resetButton.classList.add("btn-disabled");
    newGameButton.classList.remove("btn-disabled");
  } else {
    resetButton.classList.toggle(
      "btn-disabled",
      [...cells].every((cell) => cell.innerText === "")
    );
    newGameButton.classList.add("btn-disabled");
  }
};

// Handle Cell Click
const handleCellClick = (event) => {
  const cell = event.target;
  if (cell.innerText !== "") return; // Ignore filled cells

  cell.innerText = isPlayerX ? "X" : "O";
  cell.classList.add("disabled");

  const winner = checkWinner();
  if (winner) {
    statusText.innerText = `🎉 Player ${winner} Wins!`;
    cells.forEach((c) => c.classList.add("disabled"));
    winnerModal.style.display = "block";
    winnerName.innerText = winner;
    return;
  }

  isPlayerX = !isPlayerX; // Switch player
  statusText.innerText = isPlayerX ? "Player X's turn" : "Player O's turn";

  updateButtons(); // Enable reset button when a move is made
};

// Reset Game
const resetGame = () => {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("disabled");
  });

  isPlayerX = true;
  statusText.innerText = "Player X's turn";
  winnerModal.style.display = "none";

  updateButtons(); // Reset buttons based on new state
};

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
closeModalButton?.addEventListener("click", resetGame); // Optional chaining prevents errors

// Initialize Game on Load
window.onload = () => {
  resetGame();
  resetButton.classList.add("btn-disabled"); // Ensure reset button starts disabled
};
