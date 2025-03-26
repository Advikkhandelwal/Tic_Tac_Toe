// Accessing elements by DOM
const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const status_text = document.querySelector("#status");
const reset_button = document.querySelector("#reset");


// Initially
let currentPlayer = "X";
let board_state = Array(9).fill(""); 
let gameActive = true;

// Winning pairs
const winning_patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];


function CellClick(event) {
    const clickedCell = event.target;
    const cell_index = clickedCell.getAttribute("data-box_idx"); // Updated attribute name

    // Game over conditions
    if (!gameActive || board_state[cell_index] !== "") return;

    // Mark the cell
    board_state[cell_index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win 
    if (checkWinner()) {
        status_text.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }
    // draw condition
    if (board_state.every(cell => cell !== "")) {
        status_text.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status_text.textContent = `It's Player ${currentPlayer}'s Turn!`;
}

// Check for winner
function checkWinner() {
    for (let pattern of winning_patterns) {
        const [a, b, c] = pattern;
        if (board_state[a] && board_state[a] === board_state[b] && board_state[a] === board_state[c]) {
            highlightWinningCells(pattern);
            return true;
        }
    }
    return false;
}

// Highlight winning cells
function highlightWinningCells(pattern) {
    pattern.forEach(index => cells[index].classList.add("winning-cell"));
}

// Reset the game
function reset_Game() {
    board_state.fill("");
    gameActive = true;
    currentPlayer = "X";
    status_text.textContent = "It's Player X's Turn!";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", CellClick));
reset_button.addEventListener("click", reset_Game);
