const board = document.getElementById('board');
const playerHand = document.getElementById('player-hand');
const drawButton = document.getElementById('draw-btn');

let playerDominos = [];

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

// Function to draw a domino
function drawDomino() {
    if (playerDominos.length < 7) {
        const value1 = Math.floor(Math.random() * 7);
        const value2 = Math.floor(Math.random() * 7);
        const domino = createDomino(value1, value2);
        playerHand.appendChild(domino);
        playerDominos.push(domino);
    } else {
        alert("You can only hold 7 dominoes.");
    }
}

// Function to place a domino on the board
function placeDomino(domino) {
    const value1 = domino.getAttribute('data-value1');
    const value2 = domino.getAttribute('data-value2');
    
    // Check if the board is empty or if the domino can be placed
    if (board.children.length === 0 || canPlaceDomino(value1, value2)) {
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

// Event listener for the draw button
drawButton.addEventListener('click', drawDomino);
