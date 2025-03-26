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
    const cell_index = clickedCell.getAttribute("data-box_idx"); // 

    // Game over conditions
    if (!gameActive || board_state[cell_index] !== "") return;

    // Mark the cell
    board_state[cell_index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

