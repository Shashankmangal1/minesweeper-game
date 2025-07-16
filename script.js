const board = document.getElementById('game-board');

const rows = 9;
const cols = 9;

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  board.appendChild(cell);
}
