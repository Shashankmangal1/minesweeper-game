const gameBoard = document.getElementById("game-board");
const mineCounter = document.getElementById("mine-counter");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

const rows = 8;
const cols = 8;
const mineCount = 10;
let board = [];
let timer = 0;
let interval;

function startTimer() {
  timer = 0;
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `⏱️ Time: ${timer}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function updateMineCounter(count) {
  mineCounter.textContent = `💣 Mines: ${count}`;
}

function resetGame() {
  stopTimer();
  gameBoard.innerHTML = "";
  board = [];
  initializeGame();
}

restartBtn.addEventListener("click", resetGame);

function initializeGame() {
  let flagsUsed = 0;
  updateMineCounter(mineCount - flagsUsed);
  startTimer();

  // 1. Initialize board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = {
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        element: null,
        x: i,
        y: j,
      };
    }
  }

  // 2. Place mines
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);

    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      minesPlaced++;
    }
  }

  // 3. Count neighboring mines
  function countNeighborMines(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && board[nx][ny].isMine) {
          count++;
        }
      }
    }
    return count;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j].neighborMines = countNeighborMines(i, j);
    }
  }

  // 4. Create UI
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = i;
      cellDiv.dataset.col = j;

      const cellData = board[i][j];
      cellData.element = cellDiv;

      // Left click: Reveal
      cellDiv.addEventListener("click", () => {
        if (cellData.isRevealed || cellData.isFlagged) return;

        cellData.isRevealed = true;
        cellDiv.classList.add("revealed");

        if (cellData.isMine) {
          cellDiv.textContent = "💣";
          cellDiv.classList.add("mine");
          stopTimer();
          alert("Boom! Game Over.");
        } else {
          const num = cellData.neighborMines;
          if (num > 0) {
            cellDiv.textContent = num;
            cellDiv.dataset.num = num;
          }
        }
      });

      // Right click: Flag
      cellDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (cellData.isRevealed) return;

        cellData.isFlagged = !cellData.isFlagged;
        flagsUsed += cellData.isFlagged ? 1 : -1;
        updateMineCounter(mineCount - flagsUsed);

        cellDiv.textContent = cellData.isFlagged ? "🚩" : "";
        cellDiv.classList.toggle("flag", cellData.isFlagged);
      });

      gameBoard.appendChild(cellDiv);
    }
  }
}

// Initial game start
initializeGame();
