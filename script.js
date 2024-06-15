const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const modal = document.getElementById('winner-modal');
const closeButton = document.getElementById('close-button');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 'S';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        winnerMessage.textContent = `Congrats ${currentPlayer} wins!`;
        showModal();
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        winnerMessage.textContent = 'Draw!';
        showModal();
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'S' ? 'A' : 'S';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'S';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('S', 'A');
    });
    closeModal();
}

function showModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    resetGame();
}
