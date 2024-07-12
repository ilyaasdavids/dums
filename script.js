const board = document.getElementById('board');
const playerHand = document.getElementById('player-hand');
const drawButton = document.getElementById('draw-btn');

let playerDominos = [];
let firstRound = false; // Set to false since the game starts with 6|6

// Function to create a domino tile
function createDomino(value1, value2) {
    const domino = document.createElement('div');
    domino.classList.add('domino');
    domino.innerText = `${value1}|${value2}`;
    domino.setAttribute('data-value1', value1);
    domino.setAttribute('data-value2', value2);
    domino.addEventListener('click', () => placeDomino(domino));
    return domino;
}

// Function to check if the domino already exists in player's hand
function dominoExists(value1, value2) {
    return playerDominos.some(domino => {
        const v1 = domino.getAttribute('data-value1');
        const v2 = domino.getAttribute('data-value2');
        return (v1 === value1 && v2 === value2) || (v1 === value2 && v2 === value1);
    });
}

// Function to draw a domino
function drawDomino() {
    if (playerDominos.length >= 7) {
        alert("You can only hold 7 dominoes.");
        return; // Prevent further draws
    }

    let value1, value2;
    do {
        value1 = Math.floor(Math.random() * 7);
        value2 = Math.floor(Math.random() * 7);
    } while (dominoExists(value1.toString(), value2.toString())); // Keep drawing until unique

    const domino = createDomino(value1, value2);
    playerHand.appendChild(domino);
    playerDominos.push(domino);
}

// Function to place a domino on the board
function placeDomino(domino) {
    const value1 = domino.getAttribute('data-value1');
    const value2 = domino.getAttribute('data-value2');

    // Check if the domino can be placed on the board
    if (canPlaceDomino(value1, value2)) {
        board.appendChild(domino);
        playerDominos = playerDominos.filter(d => d !== domino);
        playerHand.removeChild(domino);
    } else {
        alert("You can't place this domino here!");
    }
}

// Function to check if the domino can be placed
function canPlaceDomino(value1, value2) {
    const firstDomino = board.firstChild;
    const lastDomino = board.lastChild;

    if (!firstDomino) return true; // If board is empty

    const firstValue = firstDomino.innerText.split('|')[0];
    const lastValue = lastDomino.innerText.split('|')[1];

    return (value1 === firstValue || value2 === lastValue || value1 === lastValue || value2 === firstValue);
}

// Initialize the game with the 6|6 domino on the board
function initializeGame() {
    const initialDomino = createDomino(6, 6);
    board.appendChild(initialDomino);
    firstRound = true; // Setting to true since we used the 6|6 to start
}

// Event listener for the draw button
drawButton.addEventListener('click', drawDomino);

// Start the game
initializeGame();
