const board = document.getElementById("game-board");

const rows = 9;
const cols = 9;

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div"); // add's a new div
  cell.classList.add("cell"); // add 'cell' class

  //Cell click logic

  cell.addEventListener("click", () => {
    cell.style.backgroundColor = "#eee"; // Reveal color
    cell.innerText = 0; //Place holder
  });

  board.appendChild(cell); // update the board
}
