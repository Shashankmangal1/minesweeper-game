const gameBoard = document.getElementById("game-board");

const rows = 8;
const cols = 8;
const mineCount = 10;
let board = [];

// 1. Initialize the board with cell objects
for (let i = 0; i < rows; i++) {
  board[i] = [];
  for (let j = 0; j < cols; j++) {
    board[i][j] = {
      isMine: false,
      isRevealed: false,
      x: i,
      y: j
    };
  }
}

// 2. Randomly place mines
let minesPlaced = 0;
while (minesPlaced < mineCount) {
  const x = Math.floor(Math.random() * rows);
  const y = Math.floor(Math.random() * cols);

  if (!board[x][y].isMine) {
    board[x][y].isMine = true;
    minesPlaced++;
  }
}

// 3. Create cell UI and attach event
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");

    // Optional: store coordinates on DOM
    cellDiv.dataset.row = i;
    cellDiv.dataset.col = j;

    // Cell click logic
    cellDiv.addEventListener("click", () => {
      const cellData = board[i][j];
      cellData.isRevealed = true;
      cellDiv.style.backgroundColor = "#eee";

      if (cellData.isMine) {
        cellDiv.innerText = "💣";
        cellDiv.style.backgroundColor = "red";
        alert("Boom! Game Over.");
      } else {
        cellDiv.innerText = 0; // Placeholder, we will compute neighbors later
      }
    });

    gameBoard.appendChild(cellDiv);
  }
}
